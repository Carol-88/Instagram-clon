import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "..";

const UserName = (data) => {
  const [token] = useContext(TokenContext);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUserName() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/profile`,
          { headers: { Authorization: token } }
        );
        const { data } = await response.json();

        setUserName(data.username);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (token) loadUserName();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return <h2>{userName}</h2>;
};

export default UserName;
