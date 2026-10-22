import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../Main/ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import { useEffect } from "react";

function EditProfileModal({
  isOpen,
  handleCloseModal,
  handleUpdateUser,
  currentUser,
}) {
  const { values, setValues, handleChange } = useForm({
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  });

  useEffect(() => {
  if (isOpen) {
    setValues({
      name: currentUser?.name || "",
      avatar: currentUser?.avatar || "",
    });
  }
}, [isOpen, currentUser, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({
      name: values.name,
      avatar: values.avatar,
    });
  };

  function handleClose(event) {
    if (event.target === event.currentTarget) {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
      handleCloseModal();
    }
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      title="Change profile data"
      buttonText="Save changes"
      name="edit-profile-form"
      handleCloseModal={handleCloseModal}
    >
      <label className= "modal__label">
        Name *
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
      </label>
      <label className= "modal__label">
        Avatar *
      <input
        type="url"
        name="avatar"
        value={values.avatar}
        onChange={handleChange}
        placeholder="Avatar URL"
      />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
