// STORE
import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser } from "./users/slice";

// Middlewares///
// Podemos ponerle TYPES a los MIDDLEWARE
// Persistimos
const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action); // Recibe la accion. Pasa a la siguiente
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

// Sincronizamos
const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		const previusState = store.getState(); // Tenemos el estado anterior

		// Fase 1
		next(action); // Recibimos la accion (Pasamos FASE siguiente)
		// Fase 2
		if (type === "users/deleteUserById") {
			const userIdToremove = payload;
			const userToRemove = previusState.users.find(
				(user) => user.id === payload,
			); // Buscamos el usuario a eliminar
			fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (res.ok) {
						toast.success(`User ${payload} succefully deleted`);
					}
					throw new Error("Error to delete user");
				})
				.catch((err) => {
					toast.error(`Error deleting user ${userIdToremove}`);
					if (userToRemove) store.dispatch(rollbackUser(userToRemove));
					console.log(err);
					console.log("error");
				});
		}
	};
////////////////

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

// Exportamos los TYPES
// Nos devuelve ese tipo
// En este caso, el tipo es de "users", que tiene a "UsersWithId", que es un ARRAY
export type RootState = ReturnType<typeof store.getState>; // Le pasamos la funcion de donde deberia sacar eso
export type AppDispatch = typeof store.dispatch; // Sabe las acciones que lanzara, es de la STORE q creamos ahi
