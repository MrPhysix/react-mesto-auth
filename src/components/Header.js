import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Logo from '../images/logo.svg';
import closeIcon from '../images/close-icon.svg';
import menuIcon from '../images/burg.svg';

function Header({ loggedIn, loginHandler, email }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const currentPath = useLocation().pathname;
  const [resolution, setResolution] = useState(
    window.matchMedia('(max-width: 880px)').matches
  );

  useEffect(() => {
    const setSize = () => {
      setResolution(window.matchMedia('(max-width: 880px)').matches);
    };
    window.addEventListener('resize', setSize, false);
    return () => window.removeEventListener('resize', setSize, false);
  }, []);

  useEffect(() => {
    //автоскрытие меню, при изменение, если открыт бургер
    !resolution && setIsMenuOpened(false);
  }, [resolution]);

  function onLogOutClick() {
    loginHandler(false);
  }

  function onMenuClick() {
    setIsMenuOpened(!isMenuOpened);
  }

  const menuButtonStyle = isMenuOpened
    ? {
        backgroundImage: `url(${closeIcon})`,
      }
    : { backgroundImage: `url(${menuIcon})` };
  return (
    <>
      {isMenuOpened && (
        <div className="header__upper header__upper_opened">
          <div>
            {loggedIn ? (
              <Link
                className={`header__link hover-anim ${
                  loggedIn ? ' visible' : ''
                }`}
                style={{ marginRight: '24px' }}
                to="/"
              >
                {email}
              </Link>
            ) : (
              ''
            )}
            <Link
              className="header__link hover-anim visible"
              to={
                !loggedIn
                  ? (currentPath === '/sign-in' && '/sing-up') ||
                    (currentPath === '/sign-up' && '/sign-in')
                  : ''
              }
              onClick={loggedIn && onLogOutClick}
              style={!loggedIn ? { color: '#fff' } : { color: '#a9a9a9' }}
            >
              {loggedIn
                ? 'Выйти'
                : (currentPath === '/sign-up' && 'Вход') ||
                  (currentPath === '/sign-in' && 'Регистрация')}
            </Link>
          </div>
        </div>
      )}
      <header className="header">
        <Link to="/">
          <img
            className="header__logo hover-anim"
            src={Logo}
            alt="Место Россия"
          />
        </Link>
        {!resolution ? (
          <div
            style={{
              margin: '0',
              padding: '0',
            }}
          >
            <Link
              className={`header__link hover-anim ${
                loggedIn ? ' visible' : ''
              }`}
              style={{ marginRight: '24px' }}
              to="/"
            >
              {email}
            </Link>
            <Link
              className="header__link hover-anim visible"
              to={
                !loggedIn
                  ? (currentPath === '/sign-in' && '/sing-up') ||
                    (currentPath === '/sign-up' && '/sign-in')
                  : ''
              }
              onClick={loggedIn && onLogOutClick}
              style={!loggedIn ? { color: '#fff' } : { color: '#a9a9a9' }}
            >
              {loggedIn
                ? 'Выйти'
                : (currentPath === '/sign-up' && 'Вход') ||
                  (currentPath === '/sign-in' && 'Регистрация')}
            </Link>
          </div>
        ) : (
          <button
            className="header__menu-button"
            onClick={onMenuClick}
            style={menuButtonStyle}
          />
        )}
      </header>
    </>
  );
}

export default Header;
