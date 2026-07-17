import React from "react";
import "./ItemModal.css";
import closeButton from "../../assets/close-btn.svg";

function ItemModal({ card, isOpen, handleCloseModal }) {
  if (!isOpen || !card);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  }

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-btn"
          onClick={handleCloseModal}
          aria-label="Close modal"
        >
          <img src={closeButton} alt="Close" />
        </button>
        <img
          src={card.link}
          alt={card.name}
          className="modal__image"
          alt="Modal Image"
        />
        <div className="modal__footer">
          <h2 className="modal__text">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
      <p className="card__title">{card.title}</p>
    </div>
  );
}

export default ItemModal;
