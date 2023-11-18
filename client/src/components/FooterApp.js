import React from "react";
import Logout from "./Logout";
import Search from "./Search";
import UserName from "./UserName";

function FooterApp() {
  return (
    <div className="footerApp">
      {/* <Avatar img={data.avatar} /> */}

      <p className="username-footer spaceFooter">
        <UserName />
      </p>

      <p>
        <Search />
      </p>

      <p className="logout spaceFooter">
        <Logout />
      </p>

      <p className="info spaceFooter">
        Información - Ayuda - Prensa - API - Empleo - Privacidad - Condiciones -
        Ubicaciones - Idioma - Español
      </p>
      <p className="insta-footer"> © 2023 INSTAGROM FROM CAROLINA & MARTA</p>
    </div>
  );
}

export default FooterApp;
