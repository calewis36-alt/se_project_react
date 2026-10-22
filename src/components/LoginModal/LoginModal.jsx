import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../Main/ModalWithForm/ModalWithForm";

const defaultValues = { email: "", password: "" };

function LoginModal({
  handleCloseModal,
  handleLogin,
  errorMessage,
  setErrorMessage,
  isOpen,
}) {
  const { values, setValues, handleChange } = useForm(defaultValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({
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
      title="Sign in"
      buttonText="Next"
      name="login-form"
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
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
          Password
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
        {errorMessage && <span className="modal__error">{errorMessage}</span>}
      </fieldset>
    </ModalWithForm>
  );
}

export default LoginModal;
