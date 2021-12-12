import FormInput from './FormInput';
import PopupWithForm from './PopupWithForm';
import React, { useEffect } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleChange = (setStateAction) => (evt) => {
    setStateAction(evt.target.value);
    console.log(evt.target + ' changed');
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое &nbsp;место"
      name="add"
      isOpen={isOpen}
      submitText="Добавить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <FormInput
        placeholder="Название"
        type="text"
        name="name"
        minLength={2}
        maxLength={30}
        onChange={handleChange(setName)}
        value={name}
      />
      <FormInput
        placeholder="Ссылка&nbsp;на&nbsp;картинку"
        type="url"
        name="link"
        minLength={2}
        maxLength={200}
        onChange={handleChange(setLink)}
        value={link}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
