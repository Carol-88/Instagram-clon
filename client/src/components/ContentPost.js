// import React, { useEffect, useState } from "react";

function ContentPost({ photoName, caption, location, publicationDate }) {
  return (
    <div className="post">
      <figure>
        <img
          className="photo-post"
          src={`${process.env.REACT_APP_BACKEND}/photos/${photoName}`}
          alt={caption}
        />
      </figure>
      <div className="letter-post">
        <h2 className="caption-post">{caption}</h2>

        <p className="location-post">{location && <p>{location}</p>}</p>

        <p>{new Date(publicationDate).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default ContentPost;
