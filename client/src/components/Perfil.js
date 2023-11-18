import React, { useContext, useEffect, useState } from "react";
// import Avatar from "./Avatar";
import UserName from "./UserName";
import PostList from "./PostList";
import { TokenContext } from "..";
import { Navigate } from "react-router-dom";
import FooterApp from "./FooterApp";
// import AvatarForm from "./AvatarForm";

const Perfil = (data) => {
	const [token] = useContext(TokenContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const [username, setUsername] = useState("");
	const [photos, setPhotos] = useState(null);

	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	// const [birthday, setBirthday] = useState(null);

	useEffect(() => {
		async function loadUserProfile() {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_BACKEND}/profile`,
					{ headers: { Authorization: token } }
				);
				const { data } = await response.json();

				setUsername(data.username);
				setPhotos(data.photos);
				setName(data.name);
				setLastname(data.lastname);
				// setBirthday(data.birthday);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}

		if (token) loadUserProfile();
	}, [token]);

	if (!token) {
		return <Navigate to="/login" />;
	}

	if (loading) return <p>Cargando...</p>;
	if (error) return <p>{error}</p>;

	return (
		<>
			<article class="user">
				{/* <Avatar src={data.avatar} /> <AvatarForm /> */}
				{/* <h2 className="username">
        <UserName name={username} />
      </h2> */}
				<p className="profile">
					<p>
						{name} {lastname}
						{/* <p className="birthday">* {birthday} *</p> */}
					</p>
				</p>

				<p className="postlist-perfil">
					<PostList photos={photos} />
				</p>
			</article>
			<footer>
				<FooterApp />
			</footer>
		</>
	);
};

export default Perfil;
