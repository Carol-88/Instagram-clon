import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "..";
import Avatar from "./Avatar";

function CommentForm() {
  const [comment, setComment] = useState("");
  const [token, setToken] = useContext(TokenContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addComment = {
      text: comment,
    };

    const serializedData = JSON.stringify(addComment);
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/addComment`, {
      method: "POST",
      body: serializedData,
      headers: {
        "Content-type": "application/json",
      },
    });

    const responseBody = await res.json();
    const token = responseBody;
    setToken(token);
    setComment("");
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Avatar img="/stories/456330.png" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-post"></label>
        <input
          id="comment-post"
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Escribe tu comentario.."
        ></input>
        <button className="sendComment" type="submit">
          Enviar
        </button>
      </form>
    </>
  );
}

export default CommentForm;
