import { useState, useEffect } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../Main/ModalWithForm/ModalWithForm";

import { defaultClothingItems } from "../../utils/defaultClothingItems";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: { F: 0, C: 0 },
    type: "warm",
  });
  const [currentTemperatureUnit, setCurrentTempUnit] = useState("F");

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

  function handleToggleSwitchChange() {
    if (currentTemperatureUnit === "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <Header
          weatherData={weatherData}
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        />
        <Main
          weatherData={weatherData}
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
          name="add-garment-form"
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
        >
          <fieldset className="modal__fieldset">
            <label htmlFor="garment-name" className="modal__label">
              Name
              <input
                id="garment-name"
                type="text"
                className="modal__input"
                placeholder="Name"
              />
            </label>
            <label className="modal__image">
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
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
