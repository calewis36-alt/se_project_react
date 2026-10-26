import React from "react";
import "./ItemModal.css";
import closeButton from "../../assets/close-btn.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  card,
  isOpen,
  handleCloseModal,
  handleDeleteItem,
  handleOpenConfirmationModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  function handleDelete() {
    handleOpenConfirmationModal(card);
  }
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
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__text">
            {card.name}
            <button onClick={handleDelete} className="modal__delete-btn">
              Delete item
            </button>
          </h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
