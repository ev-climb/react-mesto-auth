import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(false);
    }

    const handleCardClick = (card) => {
        setSelectedCard({
          card: true,
          img: card.img,
          title: card.title
        });
      }

  return (
    <div className="page">
        <Header/>
        <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
        />
        <Footer/>
        <PopupWithForm
            isOpen={isEditAvatarPopupOpen}
            title="Обновить аватар"
            name="avatar"
            buttonText="Сохранить"
            children={
                <>
                    <label className="popup__form-field">
                        <input className="popup__input" id="popup__link-avatar" name="link" required
                        placeholder="Ссылка на аватар" type="url" minLength="2" />
                        <span className="popup__input-error popup__link-avatar-error"></span>
                    </label>
                </>
            }
            onClose={closeAllPopups}
        />
        <PopupWithForm
            isOpen={isEditProfilePopupOpen}
            title="Редактировать профиль"
            name="edit"
            buttonText="Сохранить"
            children={
                <>
                    <label className="popup__form-field">
                        <input className="popup__input popup__input_name" id="name-input" name="name" required placeholder="Имя"
                            type="text" maxLength="40" minLength="2" />
                        <span className="popup__input-error name-input-error"></span>
                    </label>
                    <label className="popup__form-field">
                        <input className="popup__input popup__input_job" id="job-input" name="about" required placeholder="О себе"
                            type="text" maxLength="200" minLength="2" />
                        <span className="popup__input-error job-input-error"></span>
                    </label>
                </>
            }
            onClose={closeAllPopups}
        />
        <PopupWithForm
            isOpen={isAddPlacePopupOpen}
            title="Новое место"
            name="add"
            buttonText="Создать"
            children={
                <>
                    <label className="popup__form-field">
                        <input className="popup__input popup__input_place" id="place-input" name="place" required
                            placeholder="Название" type="text" maxLength="30" minLength="2" />
                        <span className="popup__input-error place-input-error"></span>
                    </label>
                    <label className="popup__form-field">
                        <input className="popup__input popup__input_link" id="link-input" name="link" required
                            placeholder="Ссылка на картинку" type="url" />
                        <span className="popup__input-error link-input-error"></span>
                    </label>
                </>
            }
            onClose={closeAllPopups}
        />
        <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
        />

    </div>
  );
}

export default App;
