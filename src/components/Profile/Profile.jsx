import "./Profile.css";
import SideBar from "../SideBar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleOpenAddGarmentModal,
  handleOpenItemModal,
  handleLogout,
  setActiveModal,
  handleCardLike,
}) {
  return (
    <main className="profile">
      <SideBar handleLogout={handleLogout} setActiveModal={setActiveModal} />
      <ClothesSection
        clothingItems={clothingItems}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        handleOpenItemModal={handleOpenItemModal}
        handleCardLike={handleCardLike}
      />
    </main>
  );
}

export default Profile;
