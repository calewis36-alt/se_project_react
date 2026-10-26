import "./ItemCard.css";
import likeIcon from "../../assets/like-icon.svg";
import likedIcon from "../../assets/liked-icon.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ data, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  function handleOpenCard() {
    onCardClick(data);
  }

  function handleLikeCard() {
    onCardLike(data);
  }

  return (
    <li className="card">
      <h2 className="card__title">{data.name}</h2>
      <img
        src={data.imageUrl}
        alt={data.name}
        className="card__image"
        onClick={handleOpenCard}
      />
      <button
        className="card__like-button"
        onClick={handleLikeCard}
        aria-label="Like"
      >
        {currentUser && (
          <img
            src={
              data.likes.some((like) => like === currentUser._id)
                ? likedIcon
                : likeIcon
            }
            alt="like"
            className="card__like-icon"
          />
        )}
      </button>
    </li>
  );
}

export default ItemCard;
