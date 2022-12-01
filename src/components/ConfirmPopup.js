import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props){
    
    function handleDeleteClick(evt) {
        evt.preventDefault();
        props.onCardDelete(props.card.img);
        props.onClose()    
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            title="Вы уверены?"
            onClose={props.onClose}
            name="delete"
            buttonText="Да"
            onSubmit={handleDeleteClick}
        />                     
    )
}

export default ConfirmPopup;