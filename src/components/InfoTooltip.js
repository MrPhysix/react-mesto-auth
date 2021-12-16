import React, { useEffect } from 'react';
import authImageTrue from '../images/auth_img_true.svg';
import authImageFalse from '../images/auth_img_false.svg';

function InfoTooltip({ isOpen, onClose, result }) {
  useEffect(() => {
    const popupCloseHandler = {
      onClick: function (evt) {
        if (
          evt.target.classList.contains('popup_opened') ||
          evt.target.classList.contains('popup__wrapper')
        ) {
          isOpen && onClose();
        }
      },
      onKey: function (evt) {
        if (isOpen && evt.key === 'Escape') {
          onClose();
        }
      },
    };
    isOpen && window.addEventListener('click', popupCloseHandler.onClick);
    isOpen && window.addEventListener('keyup', popupCloseHandler.onKey);

    return () => {
      window.removeEventListener('keyup', popupCloseHandler.onKey);
      window.removeEventListener('click', popupCloseHandler.onClick);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__wrapper">
        <button
          className="popup__close-button hover-anim"
          type="button"
          onClick={onClose}
        />
        <div className="popup__container">
          <img
            style={{
              margin: '30px auto',
              display: 'block',
            }}
            src={result ? authImageTrue : authImageFalse}
            alt="result"
          />
          <h3
            className="popup__title"
            style={{
              marginBottom: '25px',
              textAlign: 'center',
            }}
          >
            {result
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так!\nПопробуйте ещё раз.'}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
