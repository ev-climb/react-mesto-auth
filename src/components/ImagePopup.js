import React from "react";

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.card ? 'popup_opened' : ''}`}> 
            <div className="popup__background">
                <button 
                    onClick={props.onClose}
                    className="popup__close-button" 
                    type="button" 
                    aria-label="Закрыть">
                </button>
                <img
                    src={`${props.card ? props.card.img : '#'}`} 
                    alt="Изображение"
                    className="popup__image" 
                />
                <h2 className="popup__subtitle">{`${props.card ? props.card.title : ''}`}</h2>
            </div>
        </div>
    )
}

export default ImagePopup