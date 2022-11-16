import React from 'react';

function Card(props) {
  const {img, title, like} = props;

  function handleClick() {
    props.onCardClick(props);
  }

  return (
    <div className="element">
            <img className="element__image" onClick={handleClick} src={img} alt={title} />
            <button className="element__delete-button element__delete-button_inactive" type="button" aria-label="Закрыть"></button>
            <div className="element__content">
                <h2 className="element__title">{title}</h2>
                <div className="element__like-containner">
                    <button className="element__like-button" type="button" aria-label="Лайк"></button>
                    <h3 className="element__likes">{like}</h3>
                  </div>
            </div>
        </div>
  )
}

export default Card;