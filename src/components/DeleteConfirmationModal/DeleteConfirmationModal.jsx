import ModalWithForm from "../Main/ModalWithForm/ModalWithForm";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  isOpen,
  handleCloseModal,
  handleDeleteItem,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleDeleteItem();
  };

  function handleClose(event) {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Are you sure you want to delete this item?"
      buttonText="Yes, delete item"
      name="delete-confirmation-form"
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
    >
      <p className="modal__confirmation-text">This action is irreversible.</p>
      <button
        type="button"
        className="modal__cancel-btn"
        onClick={handleCloseModal}
      >
        Cancel
      </button>
    </ModalWithForm>
  );
}

export default DeleteConfirmationModal;
