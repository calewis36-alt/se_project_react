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
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  baseUrl,
} from "../../utils/api.js";
import { login, register, checkToken } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
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

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like === currentUser._id);
    const likePromise = isLiked
      ? removeCardLike(card._id)
      : addCardLike(card._id);

    likePromise
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === card._id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  }

  function handleRemoveCardLike(card) {
    removeCardLike(card._id)
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === card._id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  }

  function handleLogin({ email, password }) {
    login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        checkToken(data.token).then((user) => {
          setCurrentUser(user);
          handleCloseModal();
        });
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  }

  function handleRegister({ name, avatar, email, password }) {
    register({ name, avatar, email, password })
      .then((data) => {
        return login({ email, password });
      })
      .then((loginData) => {
        localStorage.setItem("jwt", loginData.token);
        setIsLoggedIn(true);
        checkToken(loginData.token).then((user) => {
          setCurrentUser(user);
          handleCloseModal();
        });
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  }

  function handleEditProfile({ name, avatar }) {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setErrorMessage("User is not logged in.");
      return;
    }

    fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile.");
        }
        return response.json();
      })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }

  function handleOpenConfirmationModal(card) {
    setSelectedCard(card);
    setActiveModal("delete-confirmation-modal");
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.error("Failed to check token:", err);
        });
    }
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
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Header
            weatherData={weatherData}
            handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            setActiveModal={setActiveModal}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  handleCardLike={handleCardLike}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleLogout={handleLogout}
                    setActiveModal={setActiveModal}
                    clothingItems={clothingItems}
                    handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                    handleOpenItemModal={handleOpenItemModal}
                    handleCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
          <Footer />
          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "item-modal"}
            handleCloseModal={handleCloseModal}
            handleDeleteItem={handleDeleteItem}
            handleOpenConfirmationModal={handleOpenConfirmationModal}
            isLoggedIn={isLoggedIn}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment-modal"}
            handleCloseModal={handleCloseModal}
            handleAddItemSubmit={handleAddItemSubmit}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          <LoginModal
            isOpen={activeModal === "login-modal"}
            handleCloseModal={handleCloseModal}
            handleLogin={handleLogin}
            errorMessage={errorMessage}
            setActiveModal={setActiveModal}
          />
          <RegisterModal
            isOpen={activeModal === "register-modal"}
            handleCloseModal={handleCloseModal}
            handleRegister={handleRegister}
            errorMessage={errorMessage}
            setActiveModal={setActiveModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile-modal"}
            handleCloseModal={handleCloseModal}
            handleUpdateUser={handleEditProfile}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation-modal"}
            handleCloseModal={handleCloseModal}
            handleDeleteItem={() => handleDeleteItem(selectedCard)}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
