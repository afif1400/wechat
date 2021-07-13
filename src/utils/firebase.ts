import firebase from "firebase/app";
import "firebase/auth";

export const Providers = {
	google: new firebase.auth.GoogleAuthProvider(),
	facebook: new firebase.auth.FacebookAuthProvider(),
};
export const auth = firebase
	.initializeApp({
		apiKey: "AIzaSyBOYd4su55aJQKIWYJhM57Ik6CcX4hMRpY",
		authDomain: "wechat-c31da.firebaseapp.com",
		projectId: "wechat-c31da",
		storageBucket: "wechat-c31da.appspot.com",
		messagingSenderId: "714857246502",
		appId: "1:714857246502:web:57ec68c8b9416cfbbb5be7",
	})
	.auth();

export default firebase;
