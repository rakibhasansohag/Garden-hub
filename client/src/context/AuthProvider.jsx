import { auth } from '../firebase/firebase.init';

import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleLogin = () => {
		setLoading(true);
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};

	const updateUser = (updatedData) => {
		setLoading(true);
		return updateProfile(auth.currentUser, updatedData);
	};

	const sendPasswordResetEmailHelper = (email) => {
		setLoading(true);
		return sendPasswordResetEmail(auth, email);
	};

	// to know the current user state
	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => {
			unSubscribe();
		};
	}, []);

	const userInfo = {
		createUser,
		signIn,
		user,
		logOut,
		setUser,
		loading,
		setLoading,
		googleLogin,
		updateUser,
		sendPasswordResetEmailHelper,
	};
	return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
