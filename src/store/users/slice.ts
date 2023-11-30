import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// ESTADO POR DEFECTO
const DEFAULT_STATE = [
	{
		id: "1",
		name: "Pippin",
		email: "pippin-2-bf@shire.com",
		github: "pippin-thehobbit",
	},
	{
		id: "2",
		name: "Boromir",
		email: "commander@gondor.com",
		github: "the-horn-gondor",
	},
	{
		id: "3",
		name: "Nâzgul",
		email: "naz-crazy@mordor.com",
		github: "death-on-the-air",
	},
	{
		id: "4",
		name: "Eowyn",
		email: "the-white-princess@rohan.com",
		github: "Eowyn Rohan",
	},
];

// Creamos el TYPE UserId, y lo exportamos
export type UserId = string;

// Propiedades del "user"
export interface User {
	name: string;
	email: string;
	github: string;
}

// "user" del ESTADO
export interface UserWithId extends User {
	id: UserId;
}

// Esto es un ESTADO inicial de prueba
// Llamamos a una funcion auto-invocable
// Es lo q se llama una IIFE (Immediately Invoked Function Expression)
const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__"); // Leemos el ESTADO PERSISTENTE
	if (persistedState) {
		// Si existe el "persistedState"
		return JSON.parse(persistedState).users; // Devolvemos el estado inicial
	}
	// Si no
	return DEFAULT_STATE; // Devolvemos el estado por defecto
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		// Aqui van las ACTIONS
		// Tipamos para q la ACTION sea del TIPO que corresponde, un STRING
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			return [...state, { id, ...action.payload }]; // Creamos un nuevo estado a partir del anterior
			// Con la ACTION añadimos un nuevo USER junto con la ID creada (a partir de generla con la UUID)
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload; // recuperamos la ID
			// Devuelve un nuevo estado
			return state.filter((user) => user.id !== id); // Filtramos ese estado: los usuario q sean diferentes a esa ID que nos pasaron
		},
	},
});

// Los REDUCERS "calculan" y crean el nuevo estado
export default usersSlice.reducer;

// Exportamos esta accion
export const { addNewUser, deleteUserById } = usersSlice.actions;
