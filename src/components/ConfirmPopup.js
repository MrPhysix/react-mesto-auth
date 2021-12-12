import PopupWithForm from './PopupWithForm';
import React from 'react';

function ConfirmPopup({ isOpen, onClose, onSubmit, card }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm //confirm
      title="Вы&nbsp;уверены?"
      name="confirm"
      isOpen={isOpen}
      submitText="Да"
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmPopup;
