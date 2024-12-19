/* eslint-disable react-refresh/only-export-components */
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@utils/defs";
import React, { createContext, useCallback, useContext, useState } from "react";

interface LogoutProviderProps {
	children: React.ReactNode;
	setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutContext = createContext<{
	logout: () => void;
	onLogout: (callback: () => void) => void;
}>({
	logout: () => {},
	onLogout: () => {},
});

export const LogoutProvider: React.FC<LogoutProviderProps> = ({ children, setAuth }) => {
	const [listeners, setListeners] = useState<(() => void)[]>([]);

	const [logout] = useMutation(LOGOUT);

	const onLogout = useCallback(
		(callback: () => void) => {
			setListeners((prev) => [...prev, callback]);

			setAuth(false);
			sessionStorage.removeItem("connect.sid");

			return () => {
				setListeners((prev) => prev.filter((listener) => listener !== callback));
			};
		},
		[listeners, setAuth, setListeners],
	);

	return <LogoutContext.Provider value={{ logout, onLogout }} children={children} />;
};

export const useLogout = () => useContext(LogoutContext);
