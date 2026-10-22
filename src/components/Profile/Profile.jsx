import "./Profile.css";
import SideBar from "../SideBar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleOpenAddGarmentModal,
  handleOpenItemModal,
  currentUser,
  handleLogout,
  setActiveModal,
}) {
  return (
    <main className="profile">
      <SideBar
        currentUser={currentUser}
        handleLogout={handleLogout}
        setActiveModal={setActiveModal}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        handleOpenItemModal={handleOpenItemModal}
      />
    </main>
  );
}

export default Profile;
