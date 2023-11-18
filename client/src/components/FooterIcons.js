import { useContext } from "react";
import { TokenContext } from "..";
import { toast } from "react-toastify";

function FooterIcons({ likedByLogguedUser, id, likePost, unlikePost }) {
	const [token] = useContext(TokenContext);
	return (
		<div className="footer-icons">
			<div className="footer-icons-img">
				{!likedByLogguedUser ? (
					<img
						onClick={async () => {
							const res = await fetch(
								`${process.env.REACT_APP_BACKEND}/favs/${id}/like`,
								{ method: "POST", headers: { authorization: token } }
							);
							if (res.ok) {
								likePost(id);
							} else {
								const body = await res.json();
								toast.error(body.message);
							}
						}}
						className="icon"
						src="/icons/corazon.png"
						alt="like"
					/>
				) : (
					<img
						onClick={async () => {
							const res = await fetch(
								`${process.env.REACT_APP_BACKEND}/favs/${id}/unlike`,
								{ method: "DELETE", headers: { authorization: token } }
							);
							if (res.ok) {
								unlikePost(id);
							} else {
								const body = await res.json();
								toast.error(body.message);
							}
						}}
						className="icon"
						src="/icons/red-heart-icon.webp"
						alt="liked"
					/>
				)}
				<img className="icon" src="/icons/comentario.png" alt="comment" />
				<img className="icon" src="/icons/compartir.png" alt="share" />
			</div>
			<div className="icon-last">
				<img className="icon" src="/icons/marcador.png" alt="keep-post" />
			</div>
		</div>
	);
}
export default FooterIcons;
