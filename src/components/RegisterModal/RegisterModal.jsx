import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../Main/ModalWithForm/ModalWithForm";

const defaultValues = { name: "", avatar: "", email: "", password: "" };

function RegisterModal({
  handleCloseModal,
  errorMessage,
  setActiveModal,
  setErrorMessage,
  handleRegister,
  isOpen,
}) {
  const { values, setValues, handleChange } = useForm(defaultValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister({
      name: values.name,
      avatar: values.avatar,
      email: values.email,
      password: values.password,
    });
    setValues(defaultValues);
  };

  function handleClose(event) {
    if (event.target === event.currentTarget) {
      setValues(defaultValues);
      handleCloseModal();
    }
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign up"
      buttonText="Sign up"
      name="register-form"
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      switchButton={
        <button
          className="modal__switch-btn"
          type="button"
          onClick={() => setActiveModal("login-modal")}
        >
          or Login
        </button>
      }
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="email" className="modal__label">
          Email
          <input
            name="email"
            id="email"
            type="email"
            className="modal__input"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password" className="modal__label">
          Password*
          <input
            id="password"
            type="password"
            className="modal__input"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name" className="modal__label">
          Name*
          <input
            name="name"
            id="name"
            type="text"
            className="modal__input"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="avatar" className="modal__label">
          Avatar URL*
          <input
            name="avatar"
            id="avatar"
            type="url"
            className="modal__input"
            placeholder="Avatar URL"
            value={values.avatar}
            onChange={handleChange}
          />
        </label>
        {errorMessage && <span className="modal__error">{errorMessage}</span>}
      </fieldset>
    </ModalWithForm>
  );
}

export default RegisterModal;
