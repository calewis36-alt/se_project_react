import { useState, useEffect } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../Main/ModalWithForm/ModalWithForm";

import { defaultClothingItems } from "../../utils/defaultClothingItems";
import "./App.css";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleCloseModal() {
    setActiveModal("");
    setErrorMessage("");
  }

  return (
    <div className="app">
      <Header handleOpenAddGarmentModal={handleOpenAddGarmentModal} />
      <Main
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
      />
      <Footer />
      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "item-modal"}
        handleCloseModal={handleCloseModal}
      />
      <ModalWithForm
        isOpen={activeModal === "add-garment-modal"}
        title="New garment"
        buttonText="Add garment"
        name="garment-name"
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      >
        <fieldset className="modal__fieldset">
          <label htmlFor="add-garment-form" className="modal__label">
            Name
            <input
              id="garment-name"
              type="text"
              className="modal__input"
              placeholder="Name"
            />
          </label>
          <label htmlFor="add-url-form" className="modal__image">
            Image{" "}
            {errorMessage && (
              <span className="modal__error">{errorMessage}</span>
            )}
            <input
              onChange={(e) => {
                if (e.target.validity.valid) {
                  setErrorMessage("");
                } else {
                  setErrorMessage("(This is not a valid image link)");
                }
              }}
              id="add-url-form"
              type="url"
              className="modal__image-url"
              placeholder="Image URL"
              name="link"
            />
          </label>
        </fieldset>
        <fieldset className="fieldset__radio">
          <legend className={"radio__title"}>Select the weather type:</legend>

          <div>
            <input
              className={"modal__radio-btn"}
              type="radio"
              id="hot"
              name="weather"
              value="hot"
            />
            <label className={"modal__label"} htmlFor="hot">
              Hot
            </label>
          </div>

          <div>
            <input
              className={"modal__radio-btn"}
              type="radio"
              id="warm"
              name="weather"
              value="warm"
            />
            <label className={"modal__label"} htmlFor="warm">
              Warm
            </label>
          </div>

          <div>
            <input
              className={"modal__radio-btn"}
              type="radio"
              id="cold"
              name="weather"
              value="cold"
            />
            <label className={"modal__label"} htmlFor="cold">
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
