import { useEffect } from 'react';

function ImagePopup({ title, image, isOpen, onClose }) {
  useEffect(() => {
    //вынести функции handleClickClose и handleKeyClose для PopupWithForm
    const handlerClose = {
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

    isOpen && window.addEventListener('click', handlerClose.onClick);
    isOpen && window.addEventListener('keyup', handlerClose.onKey);

    return () => {
      window.removeEventListener('keyup', handlerClose.onKey);
      window.removeEventListener('click', handlerClose.onClick);
    };
  }, [isOpen, onClose]);

  return (
    <div id="image-open" className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__wrapper">
        <button
          className="popup__close-button hover-anim"
          type="button"
          onClick={onClose}
        />
        <img className="popup__image" src={image} alt={title} />
        <h3 className="popup__title" id="image-open-title">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default ImagePopup;
