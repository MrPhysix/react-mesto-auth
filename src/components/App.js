//  localStorage auth /revome
//  header mobile верстка
//  может быть вынести компонет и стейт infoTooltip  App
//  currentUser обновление в header
import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);

  //
  //  localStorage Auth
  //

  useEffect(() => {
    function handleLocalStorageAuth() {
      let jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          currentUser.email = res.data.email;
        }
      });
    }

    handleLocalStorageAuth();
  }, [currentUser]);
  //
  // Get Info
  //
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([info, initialCards, jwt]) => {
        setCards(initialCards);
        setCurrentUser(info);
      })
      .catch((err) => console.log(err));
  }, []);
  //
  // Set Info
  //
  function handleUpdateAvatar(link) {
    api
      .changeUserAvatar(link)
      .then((res) => {
        setCurrentUser({ ...currentUser, res });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(info) {
    api
      .setUserInfo(info)
      .then((res) => {
        setCurrentUser({ ...currentUser, res });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //
  //  Cards
  //
  const [cards, setCards] = React.useState([]);

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    isOwn &&
      api
        .removeItem(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .then(() => closeAllPopups())
        .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .likeHandler(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //
  //  Handlers
  //

  function handleLogin(value) {
    setLoggedIn(value);
    !value && localStorage.removeItem('jwt');
  }

  function confirmPopupHandler(item) {
    setSelectedCard(item);
    setConfirmPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link,
    });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  const closeAllPopups = useCallback(() => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({ isOpen: false });
  }, []);

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} handleLogin={handleLogin} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              loggedIn ? (
                <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardRemove={confirmPopupHandler}
                />
              ) : (
                <Navigate to="/sign-up" />
              )
            }
          />
          <Route
            path="/sign-up"
            element={!loggedIn ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/sign-in"
            element={
              !loggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        <ImagePopup //picture
          title={selectedCard.name}
          image={selectedCard.link}
          isOpen={selectedCard.isOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup //editProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup //editAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup //addPlace
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ConfirmPopup //confirm
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          card={selectedCard}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
