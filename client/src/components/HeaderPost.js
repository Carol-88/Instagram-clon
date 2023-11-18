import React from "react";
// import Avatar from "./Avatar";
import PostDate from "./PostDate";

function HeaderPost({ username }) {
  return (
    <>
      {/* <Avatar img={avatar} /> */}
      <p className="username-headerpost">{username}</p>
    </>
  );
}

export default HeaderPost;
