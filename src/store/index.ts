// STORE
import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";

// Middlewares///
// Podemos ponerle TYPES a los MIDDLEWARE
const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action); // Recibe la accion. Pasa a la siguiente
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	console.log({ action, state: store.getState() });
	next(action); // Recibimos la accion
};
////////////////

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware],
});

// Exportamos los TYPES
// Nos devuelve ese tipo
// En este caso, el tipo es de "users", que tiene a "UsersWithId", que es un ARRAY
export type RootState = ReturnType<typeof store.getState>; // Le pasamos la funcion de donde deberia sacar eso
export type AppDispatch = typeof store.dispatch; // Sabe las acciones que lanzara, es de la STORE q creamos ahi
