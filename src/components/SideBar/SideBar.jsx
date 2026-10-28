import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleLogout, setActiveModal }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="avatar-placeholder">{currentUser?.name[0]}</div>
        )}
      </div>
      <div className="sidebar__buttons">
        <button
          onClick={() => setActiveModal("edit-profile-modal")}
          className="sidebar__edit-profile-btn"
        >
          Change Profile data
        </button>
        <button onClick={handleLogout} className="sidebar__logout-btn">
          Log out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
