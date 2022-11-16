import React from "react";

function PopupWithForm(props) {
    return (
        <>
            <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>

                <div className="popup__container">
                    <h2 className="popup__title">{props.title}</h2>
                    <form className={`popup__form popup__form_type_${props.name} novalidate`}>
                        {props.children}
                        <button type="submit" className="popup__button">{props.buttonText}</button>
                    </form>
                    <button 
                        className="popup__close-button" 
                        type="button" 
                        aria-label="Закрыть"
                        onClick={props.onClose}>
                    </button>
                </div>
            </div>
            
      </>
    )
    
}
export default PopupWithForm