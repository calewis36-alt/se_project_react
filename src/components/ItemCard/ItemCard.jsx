import "./ItemCard.css";

function ItemCard({ data, onCardClick }) {
  function handleOpenCard() {
    onCardClick(data);
  }

  return (
    <li className="card">
      <h2 className="card__title">{data.name}</h2>
      <img
        src={data.link}
        alt={data.name}
        className="card__image"
        alt="Card Image"
        onClick={handleOpenCard}
      />
    </li>
  );
}

export default ItemCard;
