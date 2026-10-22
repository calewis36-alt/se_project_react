import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import "./Header.css";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleOpenAddGarmentModal,
  weatherData,
  setActiveModal,
  isLoggedIn,
  currentUser,
  handleLogout,
}) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__side">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__place">
          <time className="header__datetime" dateTime={now}>
            {dateStr}
          </time>
          , {weatherData.city}
        </p>
      </div>
      <div className="header__side">
        <ToggleSwitch />
        {isLoggedIn && (
          <button
            onClick={handleOpenAddGarmentModal}
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        )}
        {isLoggedIn ? (
          <>
            <Link className="header__profile-link" to="/profile">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar || avatar}
                alt="User avatar"
                className="header__avatar"
              />
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveModal("register-modal")}
              className="header__register-btn"
            >
              Sign up
            </button>
            <button
              onClick={() => setActiveModal("login-modal")}
              className="header__login-btn"
            >
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
