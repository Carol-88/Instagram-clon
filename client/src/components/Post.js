import React from "react";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import ContentPost from "./ContentPost";
function Post({
  photoName,
  location,
  caption,
  publicationDate,
  id,
  idUser,
  likes,
  likedByLogguedUser,
  username,
  likePost,
  unlikePost,
}) {
  console.log(likedByLogguedUser);
  return (
    <div className="post-all">
      <HeaderPost username={username} />

      <ContentPost
        photoName={photoName}
        location={location}
        caption={caption}
        publicationDate={publicationDate}
      />
      <FooterPost
        likes={likes}
        id={id}
        likedByLogguedUser={likedByLogguedUser}
        likePost={likePost}
        unlikePost={unlikePost}
      />
    </div>
  );
}
export default Post;
