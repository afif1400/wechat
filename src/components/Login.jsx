import "../styles/login.css";
import React from "react";
import { ReactComponent as GoogleIcon } from "../assets/svg/google.svg";
import { ReactComponent as FacebookIon } from "../assets/svg/facebook.svg";

//? this is loaded before the auth
import "firebase/app";

import { auth } from "../utils/firebase";
import firebase from "firebase/app";

const Login = () => {
	return (
		<div className='login-page'>
			<div className='login-card'>
				<h2>Welcome to Wechat</h2>
				<div
					className='login-button google'
					onClick={() =>
						auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
					}
				>
					<GoogleIcon className='icon' /> Sign In with Google
				</div>
				<br />
				<div
					className='login-button google'
					onClick={() =>
						auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
					}
				>
					<FacebookIon className='icon' /> Sign In with Google
				</div>
			</div>
		</div>
	);
};

export default Login;
