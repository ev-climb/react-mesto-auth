import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]); 

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }
    
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
          name,
          about: description,
        });
      } 

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            title="Редактировать профиль"
            onClose={props.onClose}
            name="edit"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >           
            <label className="popup__form-field">
                <input className="popup__input popup__input_name" id="name-input" name="name" required placeholder="Имя"
                    type="text" maxLength="40" minLength="2" onChange={handleChangeName} value={name || ""} />
                <span className="popup__input-error name-input-error"></span>
            </label>
                <label className="popup__form-field">
                    <input className="popup__input popup__input_job" id="job-input" name="about" required placeholder="О себе"
                        type="text" maxLength="200" minLength="2" onChange={handleChangeDescription} value={description || ""}/>
                    <span className="popup__input-error job-input-error"></span>
                </label>
        </PopupWithForm>               
    )
}

export default EditProfilePopup;