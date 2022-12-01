import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value="";
    }, [props.isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    } 

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            title="Обновить аватар"
            name="avatar"
            buttonText="Сохранить"
            children={
                <>
                    <label className="popup__form-field">
                        <input className="popup__input" id="popup__link-avatar" name="link" required
                        placeholder="Ссылка на аватар" type="url" minLength="2" ref={avatarRef} />
                        <span className="popup__input-error popup__link-avatar-error"></span>
                    </label>
                </>
            } 
        />
    )
}

export default EditAvatarPopup;