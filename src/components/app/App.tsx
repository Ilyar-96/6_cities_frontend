import React from 'react';
import { ToastContainer } from "react-toastify";
import { AppRouter } from "../";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../../hooks';
import { authMeAction, fetchCitiesAction } from '../../store/apiActions';

export const App: React.FC = () => {
	const dispatch = useAppDispatch();
	React.useEffect(() => {
		dispatch(authMeAction());
		dispatch(fetchCitiesAction());
	}, []);

	return (
		<>
			<AppRouter />
			<ToastContainer />
		</>
	);
};
