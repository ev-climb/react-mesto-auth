import React, { useState, useEffect } from "react";
import api from "../utils/Api";
import Card from './Card';

function Main(props) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([
            api.getUser(),
            api.getAllCards(),
        ])
        .then(([infoUsers, cards]) => {
            setUserName(infoUsers.name);
            setUserDescription(infoUsers.about);
            setUserAvatar(infoUsers.avatar);
            setCards(cards.map((card) => ({
                img: card.link,
                title: card.name,
                like: card.likes.length,
                idCard: card._id
            })
        ))
        })

        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <main className="main">
        <section className="profile">
            <div className="profile__avatar-container">
                <img 
                    src={userAvatar} 
                    alt="аватар" 
                    className="profile__avatar" />
                <button 
                    type="button" 
                    className="profile__avatar-button" 
                    aria-label="Сменить аватар" 
                    onClick={props.onEditAvatar}>
                </button>
            </div>
            <div className="profile__info">
                <div className="profile__content">
                    <h1 className="profile__name">{userName}</h1>
                    <button 
                        type="button" 
                        aria-label="Редактировать профиль" 
                        className="profile__button-edit" 
                        onClick={props.onEditProfile}>
                    </button>
                </div>
                <p className="profile__description">{userDescription}</p>
            </div>
            <button 
                className="profile__button-add" 
                type="button" 
                aria-label="Добавить новое фото" 
                onClick={props.onAddPlace}>
            </button>
        </section>
        <section className="elements">
            {cards.map((card) =>
            <Card onCardClick={props.onCardClick} card={card} key={card.idCard} {...card} />
            )}
        </section>
        
    </main>
    )
    
}
export default Main