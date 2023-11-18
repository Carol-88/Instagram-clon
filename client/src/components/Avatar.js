import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "..";

const Avatar = (data) => {
  //Cargar aquí el avatar en el contexto
  const [token] = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/addAvatar/${avatar}`,
          { headers: { Authorization: token } }
        );
        const { data } = await response.json();

        setAvatar(data.avatar);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (token) loadUserProfile();
  }, [token, avatar]);
  if (!token) {
    return <Navigate to="/perfil" />;
  }
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <img
        className="avatar-img"
        src={`${process.env.REACT_APP_BACKEND}/avatar/${avatar}`}
        alt={data.name}
      />
    </>
  );
};

export default Avatar;
