import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardRemove,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const cardList = cards.map((item) => {
    return (
      <Card
        key={item._id}
        data={item}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardRemove={onCardRemove}
      />
    );
  });

  return (
    <main className="container">
      <section className="profile">
        <button className="profile__avatar-button" onClick={onEditAvatar}>
          <div className="profile__cover"></div>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={`Фото профиля ${currentUser.name}`}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__edit-button hover-anim"
            type="button"
            onClick={onEditProfile}
          />
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button hover-anim"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="items">{cardList}</ul>
      </section>
    </main>
  );
}

export default Main;
