import React, { useState } from "react";
import closeButton from "../../../assets/close-btn2.svg";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  children,
  switchButton,
  handleSubmit,
  title,
  buttonText,
  name,
  handleCloseModal,
  handleClose,
}) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      handleClose(event);
    }
  }
  return (
    <div
      className={`modal modal_type_${name}${isOpen ? " modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container modal__container_type_form">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_form"
          onClick={handleCloseModal}
        >
          <img src={closeButton} alt="Close" />
        </button>
        <form
          onSubmit={handleSubmit}
          id={name}
          className="modal__form"
          noValidate
        >
          {children}
          <div className="modal__btn-group">
            <button type="submit" className="modal__submit-btn">
              {buttonText}
            </button>
            {switchButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
