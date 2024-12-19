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
	onLogout: (callback: () => void) => () => void;
}>({
	logout: () => {},
	onLogout: () => {
		return () => {};
	},
});

export const LogoutProvider: React.FC<LogoutProviderProps> = ({ children, setAuth }) => {
	const [listeners, setListeners] = useState<(() => void)[]>([]);

	const [logoutMutation] = useMutation(LOGOUT);

	const onLogout = useCallback(
		(callback: () => void) => {
			setListeners((prev) => [...prev, callback]);

			return () => {
				setListeners((prev) => prev.filter((listener) => listener !== callback));
			};
		},
		[listeners, setAuth, setListeners],
	);

	const logout = useCallback(() => {
		logoutMutation();

		setAuth(false);
		sessionStorage.removeItem("connect.sid");

		listeners.forEach((listener) => listener());
	}, [listeners, setAuth, logoutMutation]);

	return <LogoutContext.Provider value={{ logout, onLogout }} children={children} />;
};

export const useLogout = () => useContext(LogoutContext);
