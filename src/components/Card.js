import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ onCardRemove, onCardLike, onCardClick, data }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = data.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `item__delele-button hover-anim ${
    isOwn ? 'visible' : ''
  }`;

  const isLiked = data.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = `item__like hover-anim ${
    isLiked ? 'item__like_active' : ''
  } `;

  function handleRemoveClick() {
    onCardRemove(data);
  }

  function handleLikeClick() {
    onCardLike(data);
  }

  function handleCardClick() {
    onCardClick(data);
  }

  return (
    <li className="item">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleRemoveClick}
      />
      <img
        className="item__image"
        src={data.link}
        alt={data.name}
        onClick={handleCardClick}
      />
      <div className="item__align">
        <h2 className="item__title">{data.name}</h2>
        <div className="likes__align ">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <i className="likes__counter">{data.likes.length}</i>
        </div>
      </div>
    </li>
  );
}

export default Card;
