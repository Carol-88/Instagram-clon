import React from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const caption = event.target.elements.Buscador.value;
          navigate(`/inicio?caption=${caption}`);
        }}
      >
        <input type="search" placeholder="Buscar" id="Buscador" />
      </form>
    </div>
  );
}

export default Search;
