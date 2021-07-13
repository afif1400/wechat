import "../styles/index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Chats from "./Chats";
import { AuthProvider } from "../contexts/AuthContext";

const MainComponent = () => {
	return (
		<div>
			<Router>
				<AuthProvider>
					<Switch>
						<Route exact path='/chats' component={Chats} />
						<Route path='/' component={Login} />
					</Switch>
				</AuthProvider>
			</Router>
		</div>
	);
};

export default MainComponent;
