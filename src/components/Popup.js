import { useEffect } from 'react';

function Popup({ isOpen, name, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;

    function closeByKey(evt) {
      if (evt.key === 'Escape') {
        onClose();
        evt.target.blur(); //отменяет фокус на button
      }
    }

    document.addEventListener('keydown', closeByKey);
    return () => document.removeEventListener('keydown', closeByKey);
  }, [isOpen, onClose]);

  const handleOverlay = (evt) => {
    const outside =
      evt.target === evt.currentTarget ||
      evt.target.classList.contains('popup__wrapper');
    outside && onClose();
  };

  return (
    <div
      id="image-open"
      className={`popup ${isOpen ? 'popup_opened' : ''} popup_type_${name}`}
      onClick={handleOverlay}
    >
      <div className="popup__wrapper">
        <div className={`${name !== 'image' ? 'popup__container' : ''}`}>
          {children}
        </div>
        <button
          className="popup__close-button hover-anim"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Popup;
