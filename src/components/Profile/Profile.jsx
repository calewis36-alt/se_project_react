import "./Profile.css";
import SideBar from "../SideBar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  handleOpenAddGarmentModal,
  handleOpenItemModal,
  handleLogout,
  setActiveModal,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const myItems = clothingItems.filter(
    (item) => item.owner === currentUser._id,
  );

  return (
    <main className="profile">
      <SideBar handleLogout={handleLogout} setActiveModal={setActiveModal} />
      <ClothesSection
        clothingItems={myItems}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        handleOpenItemModal={handleOpenItemModal}
        handleCardLike={handleCardLike}
      />
    </main>
  );
}

export default Profile;
