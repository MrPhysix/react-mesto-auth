import React, { useEffect } from 'react';
import FormValidator from '../utils/validation';
import { validationConfig } from '../utils/utils';

function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  submitText,
  onClose,
  onSubmit,
}) {
  function handleSubmit(evt) {
    onSubmit(evt);
    setIsLoading(true);
  }

  useEffect(() => {
    setIsLoading(false);
  }, [onSubmit]);

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
  const [isLoading, setIsLoading] = React.useState(false);
  //
  //  валидация
  //
  const formRef = React.useRef();

  useEffect(() => {
    new Promise((res) => {
      const form = formRef.current;
      res(form);
    }).then((form) => {
      const validation = new FormValidator(validationConfig, form);
      isOpen && validation.enableValidation();
      onClose && validation.disableValidation();
    });
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
          <h3 className="popup__title">{title}</h3>
          <form
            ref={formRef}
            className="popup__form"
            name={name}
            onSubmit={handleSubmit}
          >
            {children}
            <button className="popup__submit-button" type="submit">
              {!isLoading ? submitText : 'Сохранение..'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
