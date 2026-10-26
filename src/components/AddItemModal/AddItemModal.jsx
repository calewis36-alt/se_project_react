import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../Main/ModalWithForm/ModalWithForm";

const defaultValues = { name: "", weather: "hot", link: "" };

function AddItemModal({
  handleCloseModal,
  handleAddItemSubmit,
  errorMessage,
  setErrorMessage,
  isOpen,
}) {
  const { values, setValues, handleChange } = useForm(defaultValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItemSubmit({
      name: values.name,
      weather: values.weather,
      imageUrl: values.link,
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
      title="New garment"
      buttonText="Add garment"
      name="add-garment-form"
      handleCloseModal={handleCloseModal}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="garment-name" className="garment__label">
          Name
          <input
            id="garment-name"
            type="text"
            className="modal__input"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label className="garment__label">
          Image{" "}
          {errorMessage && <span className="modal__error">{errorMessage}</span>}
          <input
            onChange={(e) => {
              handleChange(e);
              if (e.target.validity.valid) {
                setErrorMessage("");
              } else {
                setErrorMessage("(This is not a valid image link)");
              }
            }}
            type="url"
            className="modal__image-url"
            placeholder="Image URL"
            name="link"
            value={values.link}
          />
        </label>
      </fieldset>
      <fieldset className="fieldset__radio">
        <legend className={"radio__title"}>Select the weather type:</legend>

        <div>
          <input
            className={"modal__radio-btn"}
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <label className={"radio__label"} htmlFor="hot">
            Hot
          </label>
        </div>

        <div>
          <input
            className={"modal__radio-btn"}
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <label className={"radio__label"} htmlFor="warm">
            Warm
          </label>
        </div>

        <div>
          <input
            className={"modal__radio-btn"}
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <label className={"radio__label"} htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
