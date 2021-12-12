import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import FormInput from './FormInput';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleChange = (setStateAction) => (evt) => {
    setStateAction(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать&nbsp;профиль"
      name="edit"
      isOpen={isOpen}
      submitText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <FormInput
        placeholder="Имя"
        type="text"
        name="name"
        minLength={2}
        maxLength={40}
        onChange={handleChange(setName)}
        value={name}
      />
      <FormInput
        placeholder="Описание"
        type="text"
        name="about"
        minLength={2}
        maxLength={200}
        onChange={handleChange(setDescription)}
        value={description}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
