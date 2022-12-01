import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onConfirmPopup}) {
  
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
    function handleClick() {
      onCardClick(card.link, card.name);
    }
    
    function handleLikeClick() {
      onCardLike(card);
    }

    function openConfirmPopup() {
      onCardClick(card);
      onConfirmPopup(card)
    }

    return (
      <div className="element">
              <img className="element__image" onClick={handleClick} src={card.link} alt={card.name} />
              {isOwn && <button className="element__delete-button" type="button" aria-label="Закрыть" onClick={openConfirmPopup}></button>}
              <div className="element__content">
                  <h2 className="element__title">{card.name}</h2>
                  <div className="element__like-containner">
                      <button className={`element__like-button ${isLiked && "element__like-button_active"}`} type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
                      <h3 className="element__likes">{card.likes.length}</h3>
                    </div>
              </div>
          </div>
    )
}

export default Card;