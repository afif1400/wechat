import "../styles/chat.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../utils/firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
require("dotenv").config();

const Chats = () => {
	const history = useHistory();
	const user = useAuth();
	const [loading, setLoading] = useState(true);
	console.log(user?.user);

	const handleLogout = async () => {
		await auth.signOut();
		history.push("/");
	};

	const getFile = async (url: any) => {
		const response = await fetch(url);
		const data = await response.blob();

		return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
	};

	useEffect(() => {
		if (!user?.user || user.user === null) {
			history.push("/");

			return;
		}

		console.log(process.env);

		axios
			.get("https://api.chatengine.io/users/me/", {
				headers: {
					"project-ID": process.env.REACT_APP_CHAT_ENGINE_ID,
					"User-Name": user.user.displayName,
					"User-Secret": user.user.uid,
				},
			})
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				let formdata = new FormData();

				//@ts-ignore
				formdata.append("email", user.user.email);
				//@ts-ignore
				formdata.append("username", user.user.displayName);
				//@ts-ignore
				formdata.append("secret", user.user.uid);
				getFile(user.user?.photoURL).then((avatar) => {
					formdata.append("avatar", avatar, avatar.name);

					axios
						.post("https://api.chatengine.io/users/", formdata, {
							headers: {
								"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
							},
						})
						.then(() => {
							setLoading(false);
						})
						.catch((error) => {
							console.log(error);
						});
				});
			});
	}, [user, history]);

	if (!user || loading) return <p>Loading...</p>;
	return (
		<div className='chats-page'>
			<div className='nav-bar'>
				<div className='logo-tab'>WeChat</div>
				<div className='logout-tab' onClick={handleLogout}>
					Logout
				</div>
			</div>
			<div className='chat-box'>
				<ChatEngine
					height='calc(90vh - 66px)'
					projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
					userName={user.user?.displayName}
					userSecret={user.user?.uid}
				/>
			</div>
		</div>
	);
};

export default Chats;
