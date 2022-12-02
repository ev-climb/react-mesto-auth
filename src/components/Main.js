import { useContext } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {

    const currentUser = useContext(CurrentUserContext);
    
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img 
                        src={currentUser.avatar} 
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
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button 
                            type="button" 
                            aria-label="Редактировать профиль" 
                            className="profile__button-edit" 
                            onClick={props.onEditProfile}>
                        </button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button 
                    className="profile__button-add" 
                    type="button" 
                    aria-label="Добавить новое фото" 
                    onClick={props.onAddPlace}>
                </button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                    <Card 
                        key={card._id}
                        name={card.name}
                        link={card.link}
                        likes={card.likes}
                        onCardClick={props.onCardClick}
                        onCardSelect={props.onCardSelect}
                        card={card}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        onConfirmPopup={props.onConfirmPopup}
                    />
                ))}
            </section>
        
        </main>
    )   
}

export default Main