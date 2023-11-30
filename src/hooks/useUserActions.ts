import { User, UserId, addNewUser, deleteUserById } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
	const dispatch = useAppDispatch();
	const addUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github }));
	};
	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id)); // Utilizamos la ACTION y le pasamos la ID
	};

	return { addUser, removeUser };
};
