import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Perfil from "./components/Perfil";
import PostList from "./components/PostList";
import CommentForm from "./components/CommentForm";
import useLocalStorage from "./hooks/useLocalStorage";
import PostForm from "./components/PostForm";

export const TokenContext = React.createContext();
const TokenProvider = (props) => {
	const [token, setToken] = useLocalStorage("token");

	return (
		<TokenContext.Provider value={[token, setToken]}>
			{props.children}
		</TokenContext.Provider>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<TokenProvider>
			<BrowserRouter>
				<nav className="nav" id="main-menu">
					<p>
						<img
							className="icon insta"
							src="/icons/instagram.png"
							alt="instagram"
						/>
					</p>
					<h2>Instagrom</h2>
					<NavLink className="outline" to="inicio">
						<p>
							<img className="icon" src="/icons/inicio.png" alt="inicio" />{" "}
							Inicio
						</p>
					</NavLink>
					<NavLink className="outline" to="newUser">
						<p>
							<img className="icon" src="/icons/registro.png" alt="inicio" />{" "}
							Registro
						</p>
					</NavLink>
					<NavLink className="outline" to="login">
						<p>
							<img className="icon" src="/icons/login.png" alt="inicio" /> Login
						</p>
					</NavLink>
					<NavLink className="outline" to="perfil">
						<p>
							<img className="icon" src="/icons/perfil.png" alt="inicio" />{" "}
							Perfil
						</p>
					</NavLink>
					<NavLink className="outline" to="create">
						<p>
							<img className="icon" src="/icons/agregar.png" alt="inicio" />{" "}
							Crear
						</p>
					</NavLink>
				</nav>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/inicio" element={<App />} />
					<Route path="/newUser" element={<RegisterForm />} />
					<Route path="/login" element={<LoginForm />} />
					<Route path="/perfil" element={<Perfil />} />
					<Route path="postlist" element={<PostList />} />
					<Route path="comment" element={<CommentForm />} />
					<Route path="create" element={<PostForm />} />
				</Routes>
				<ToastContainer position="bottom-center" />
			</BrowserRouter>
		</TokenProvider>
	</React.StrictMode>
);

reportWebVitals();
