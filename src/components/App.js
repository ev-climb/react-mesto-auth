import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from "../utils/api";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardForDel, setSelectedCardForDel] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isInfoTooltip, setIsInfoTooltip] = useState(false);
    const [isProve, setIsProve] = useState(false);
    const history = useHistory();
    const [userEmail, setUserEmail] = useState("");

    useEffect(() =>{
        if (!isLoggedIn) return;

        api.getUser()
        .then((data) => {
            setCurrentUser(data)
        })
        .catch((err) => console.log(err));

        api.getAllCards()
           .then((cards) =>{
             setCards(cards);
           }) 
           .catch((err) => console.log(err))
    }, [isLoggedIn]);

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
        setIsInfoTooltip(false);
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

    function handleLogin(email, password) {
        return auth
          .authorization(email, password)
          .then((data) => {
            if (!data.token) return;
            setIsLoggedIn(true);
            localStorage.setItem("jwt", data.token);
            history.push("/");
            setUserEmail(email);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
            setIsInfoTooltip(true);
            setIsProve(false);
          });
      }
    
      function handleRegister(email, password) {
        return auth
          .register(email, password)
          .then(() => {
            setIsInfoTooltip(true);
            setIsProve(true);
            setIsLoggedIn(true);
            setUserEmail(email);
            history.push("/");
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
            setIsInfoTooltip(true);
            setIsProve(false);
          });
      }
    
      function logout() {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setUserEmail("");
      }
    
      function tokenCheck() {
        if (!localStorage.getItem("jwt")) return;
        const jwt = localStorage.getItem("jwt");
        return auth
          .getContent(jwt)
          .then((data) => {
            if (data) {
              setUserEmail(data.data.email);
              setIsLoggedIn(true);
              history.push("/");
            }
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    
      useEffect(() => {
        tokenCheck();
      }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    logout={logout}
                    userEmail={userEmail}
                    isLoggedIn={isLoggedIn}
                />
                <Switch>
                    <Route path="/sign-in">
                        <Login onLogin={handleLogin} />
                    </Route>
                    <Route path="/sign-up">
                        <Register onRegister={handleRegister} />
                    </Route>
                    <ProtectedRoute exact path="/" isLoggedIn={isLoggedIn}>
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
                    </ProtectedRoute>
                </Switch>              
                <Footer/>
                <InfoTooltip
                    isOpen={isInfoTooltip}
                    onClose={closeAllPopups}
                    isProve={isProve}
                    confirmText="Вы успешно зарегистрировались!"
                    rejectText="Что-то пошло не так! Попробуйте ещё раз."
                />
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
