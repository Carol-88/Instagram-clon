import React from "react";
import { Navigate } from "react-router-dom";

function Logout() {
	const handleSubmit = async (e) => {
		localStorage.clear();
	};

	<Navigate to="/login" />;

	return (
		<form onSubmit={handleSubmit}>
			<button className="buttonForm logoutbtn" type="submit">
				Cerrar sesión
			</button>
		</form>
	);
}

export default Logout;
