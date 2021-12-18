//validation check
import React, { useCallback, useEffect, useState } from 'react';
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
import {
  CurrentUserContext,
  IsLoadingContext,
} from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    result: null,
  });
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  //
  //  Auth
  //
  useEffect(() => {
    function handleLocalStorageAuth() {
      const jwt = localStorage.getItem('jwt');
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
          }
        })
        .catch((err) => console.log(err));
    }

    handleLocalStorageAuth();
  }, []);

  function handleSignIn(password, email) {
    auth
      .signIn(password, email)
      .then((res) => {
        loginHandler(true);
        navigate('/');
        setEmail(email);
      })
      .catch((err) => {
        setInfoTooltip({ isOpen: true, result: false });
        console.log(err);
      });
  }

  function handleSignUp(password, email) {
    auth
      .signUp(password, email)
      .then((res) => {
        setInfoTooltip({ isOpen: true, result: true });
        return res;
      })
      .catch((err) => {
        setInfoTooltip({ isOpen: true, result: false });
        console.log(err);
      });
  }

  //
  // Get Info
  //

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([info, initialCards]) => {
        setCards(initialCards);
        setCurrentUser(info);
      })
      .catch((err) => console.log(err));
  }, []);
  //
  // Set Info
  //
  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api
      .changeUserAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(info) {
    setIsLoading(true);
    api
      .setUserInfo(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
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
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  //
  //  Handlers
  //
  const handleInfoTooltipClose = (value) => {
    if (infoTooltip.result === true) {
      navigate('/sign-in');
    }
    setInfoTooltip({ isOpen: false, result: null });
  };

  function loginHandler(value) {
    setLoggedIn(value);
    !value && localStorage.removeItem('jwt');
  }

  function confirmPopupHandler(item) {
    setSelectedCard(item);
    setIsConfirmPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      name: card.name,
      link: card.link,
    });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({ isOpen: false });
  }, []);
  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} loginHandler={loginHandler} email={email} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardRemove={confirmPopupHandler}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              !loggedIn ? (
                <Register handleSignUp={handleSignUp} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/sign-in"
            element={
              !loggedIn ? (
                <Login handleSignIn={handleSignIn} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        <ImagePopup // picture
          title={selectedCard.name}
          image={selectedCard.link}
          isOpen={selectedCard.isOpen}
          onClose={closeAllPopups}
        />
        <IsLoadingContext.Provider value={isLoading}>
          <EditProfilePopup // editProfile
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup // editAvatar
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup // addPlace
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ConfirmPopup // confirm
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            card={selectedCard}
          />
        </IsLoadingContext.Provider>
        <InfoTooltip //компонент модального окна об успешной (или не очень) регистрации.
          isOpen={infoTooltip.isOpen}
          onClose={handleInfoTooltipClose}
          result={infoTooltip.result}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
