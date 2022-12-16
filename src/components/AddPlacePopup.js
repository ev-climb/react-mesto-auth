import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [formValues, setFormValues] = useState({ name: "", link: "" });

  useEffect(() => {
    setFormValues({ name: "", link: "" });
  }, [props.isOpen]);

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
        name: formValues.name,
        link: formValues.link,
    })
  }

  return (
    <PopupWithForm
        isOpen={props.isOpen}
        onSubmit={handleSubmit}
        onClose={props.onClose}
        title="Новое место"
        name="add"
        buttonText="Создать"
        children={
            <>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_place" id="place-input" name="name" required
                        placeholder="Название" type="text" maxLength="30" minLength="2" onChange={handleChange} value={formValues.name}/>
                    <span className="popup__input-error place-input-error"></span>
                </label>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_link" id="link-input" name="link" required
                        placeholder="Ссылка на картинку" type="url" onChange={handleChange} value={formValues.link}/>
                    <span className="popup__input-error link-input-error"></span>
                </label>
            </>
        }
    />
  )
}

export default AddPlacePopup;