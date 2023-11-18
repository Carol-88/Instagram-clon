import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "..";

function AvatarForm() {
  const [token] = useContext(TokenContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      setLoading(true);

      e.preventDefault();

      const data = new FormData(e.target);

      const res = await fetch(`${process.env.REACT_APP_BACKEND}/addAvatar`, {
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
      });

      if (!res.ok) {
        const body = await res.json();

        throw new Error(body.message);
      }

      navigate("/perfil");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="avatar">Avatar</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpg"
        ></input>
        <button type="submit">Sube tu avatar</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default AvatarForm;
