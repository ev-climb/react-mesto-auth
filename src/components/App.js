import { useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardForDel, setSelectedCardForDel] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() =>{
        api.getAllCards()
           .then((cards) =>{
             setCards(cards);
           }) 
           .catch((err) => console.log(err))
    }, [])

    useEffect(() =>{
        api.getUser()
        .then((data) => {
            setCurrentUser(data)
        })
        .catch((err) => console.log(err))
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err))
    } 

    function handleCardDelete(card) {
        console.log(card);
        api.deleteCard(card._id)
           .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id))
           })
           .catch((err) => console.log(err))
      }
    
    function handleUpdateUser(userInfo) {   
        api.editUser(userInfo.name, userInfo.about)
           .then((updatedInfo) => {
              setCurrentUser(updatedInfo);
              closeAllPopups();
           })
           .catch((err) => console.log(err))
      }

    function handleUpdateAvatar(avatar) {
        api.editAvatar(avatar.avatar)
           .then((updatedAvatar) => {
              setCurrentUser(updatedAvatar);
              closeAllPopups();
           })
           .catch((err) => console.log(err))
      }
    
    function handleAddPlaceSubmit(card) {
        api.addCard(card.name, card.link)
           .then((newCard) => {
              setCards([newCard, ...cards]); 
              closeAllPopups();
           })
           .catch((err) => console.log(err))
      }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleConfirmClick() {
        setIsConfirmPopupOpen(true);
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
        setIsConfirmPopupOpen(false);
        setSelectedCard(null);
    }

    const handleCardClick = (link, name) => {
        setSelectedCard({
          card: true,
          img: link,
          title: name
        });
    }

    const handleCardForDel = (card) => {
        setSelectedCardForDel({card});
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardSelect={handleCardForDel}
                    onCardLike={handleCardLike}
                    onConfirmPopup={handleConfirmClick}
                    cards={cards}
                />
                <Footer/>
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />     
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />                
                <ImagePopup 
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <ConfirmPopup
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onCardDelete={handleCardDelete}
                    card={selectedCardForDel}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
