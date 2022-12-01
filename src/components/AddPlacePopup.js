import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const[cardName, setCardName] = useState("");
  const[cardLink, setCardLink] = useState("");

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [props.isOpen]);

  function handleSetCardName(evt) {
    setCardName(evt.target.value);
  }

  function handleSetCardLink(evt) {
    setCardLink(evt.target.value);
  } 

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
        name: cardName,
        link: cardLink,
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
                    <input className="popup__input popup__input_place" id="place-input" name="place" required
                        placeholder="Название" type="text" maxLength="30" minLength="2" onChange={handleSetCardName} value={cardName}/>
                    <span className="popup__input-error place-input-error"></span>
                </label>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_link" id="link-input" name="link" required
                        placeholder="Ссылка на картинку" type="url" onChange={handleSetCardLink} value={cardLink}/>
                    <span className="popup__input-error link-input-error"></span>
                </label>
            </>
        }
    />
  )
}

export default AddPlacePopup;