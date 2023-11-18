import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "..";
// import Avatar from "./Avatar";
function PostForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token] = useContext(TokenContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const data = new FormData(e.target);
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/addPhoto`, {
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
    <div className="allForm">
      <div className="formulario">
        {/* <Avatar /> */}
        <form onSubmit={handleSubmit}>
          <div className="spaceForm">
            <label htmlFor="text-post"></label>
            <input
              className="input"
              id="text-post"
              name="caption"
              type="text"
              placeholder="¿Qué quieres compartir?"
            ></input>
          </div>

          <div className="spaceForm">
            <label htmlFor="location"></label>
            <input
              className="input"
              id="location"
              name="location"
              type="text"
              placeholder="Ubicación"
            ></input>
          </div>

          <div className="spaceForm" style={{ paddingTop: "10px" }}>
            <label htmlFor="photo-post"></label>
            <input
              className="buttonFile"
              type="file"
              id="photo-post"
              name="photo"
              accept="image/png, image/jpg"
            ></input>
          </div>

          <div style={{ paddingTop: "10px" }}>
            <button className="buttonForm publicate" type="submit">
              Publicar
            </button>
          </div>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
export default PostForm;
