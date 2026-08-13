import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { getItems, addItem, deleteItem } from "../../../api";

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

  function handleAddItemSubmit(inputValues) {
    addItem(inputValues)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleDeleteItem(item) {
    deleteItem(item._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((clothingItems) => {
            return clothingItems._id != item._id;
          }),
        );
        handleCloseModal();
      })
      .catch(console.error);
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items.reverse());
      })
      .catch(console.error);
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
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                handleOpenItemModal={handleOpenItemModal}
              />
            }
          ></Route>
        </Routes>

        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          handleCloseModal={handleCloseModal}
          handleDeleteItem={handleDeleteItem}
        />
        <AddItemModal
          isOpen={activeModal === "add-garment-modal"}
          handleCloseModal={handleCloseModal}
          handleAddItemSubmit={handleAddItemSubmit}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
