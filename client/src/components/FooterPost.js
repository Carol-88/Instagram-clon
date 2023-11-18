import FooterIcons from "./FooterIcons";

function FooterPost({
	likes,
	likedByLogguedUser,
	id,
	idUser,

	likePost,
	unlikePost,
}) {
	return (
		<>
			<FooterIcons
				likedByLogguedUser={likedByLogguedUser}
				id={id}
				likePost={likePost}
				unlikePost={unlikePost}
			/>
			<p className="likes-footer">{likes} Me gusta</p>
		</>
	);
}
export default FooterPost;
