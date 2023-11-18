import React, { useContext, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { TokenContext } from "..";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [token, setToken] = useContext(TokenContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const registerUser = {
			email: email,
			password: password,
		};

		const serializedData = JSON.stringify(registerUser);
		const res = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
			method: "POST",
			body: serializedData,
			headers: {
				"Content-type": "application/json",
			},
		});

		const responseBody = await res.json();
		if (res.ok) {
			const token = responseBody.authToken;

			setToken(token);
			setEmail("");
			setPassword("");
		} else {
			toast.error(responseBody.message);
		}
	};

	if (token) {
		return <Navigate to="/inicio" />;
	}

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div className="allForm">
			<div className="formulario">
				<h2 className="title" style={{ paddingBottom: "50px" }}>
					Instagrom
				</h2>

				<form className="form" onSubmit={handleSubmit}>
					<div className="spaceForm">
						<label htmlFor="emailform"></label>
						<input
							className="input"
							id="emailform"
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="Correo electrónico"
							value={email}
							required={true}
						></input>
					</div>

					<div className="spaceForm">
						<label htmlFor="password"></label>
						<input
							className="input"
							id="password"
							onChange={handleChangePassword}
							type="password"
							placeholder="Contraseña"
							value={password}
							required={true}
						></input>
					</div>

					<div className="allForm">
						<button className="buttonForm" type="submit">
							Iniciar sesión
						</button>
					</div>

					<p className="separation">______________ o ______________</p>

					<p className="pForm blue">Iniciar sesión con Facebook</p>

					<p className="pForm blue" style={{ fontSize: "11px" }}>
						¿Olvidaste tu contraseña?
					</p>
				</form>
			</div>

			<div className="formulario">
				<p className="text">
					¿No tienes una cuenta?
					<NavLink className="link" to="/newUser">
						Regístrate
					</NavLink>
				</p>
			</div>
			<p style={{ textAlign: "center", width: "400px", fontSize: "14px" }}>
				Descarga la app.
			</p>
		</div>
	);
}

export default LoginForm;
