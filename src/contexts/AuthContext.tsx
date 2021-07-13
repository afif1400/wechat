import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../utils/firebase";
import firebase from "firebase/app";

type IauthContext = {
	user: firebase.User | null;
};

const AuthContext = React.createContext<IauthContext>({
	user: null,
});
export const useAuth = () => useContext(AuthContext);

interface AuthProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProps) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<firebase.User | null>(null);
	const history = useHistory();

	useEffect(() => {
		auth.onAuthStateChanged((userData) => {
			setUser(userData);
			setLoading(false);
			if (user) {
				history.push("/chats");
			}
		});
	}, [user, history]);

	const value = { user };

	console.log(loading);
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
