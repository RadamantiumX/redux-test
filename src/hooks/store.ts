// Creamos nuestros CUSTOMS HOOKS
import type { TypedUseSelectorHook } from "react-redux"; // Importamos el TYPE
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

// Le cambiamos el TIPO al useAppSelector para que encaje con nuestro ESTADO
// Es un useSelector personalizado para nuestro proyecto
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
