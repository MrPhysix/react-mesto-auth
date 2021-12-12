import React, { useEffect } from 'react';
import FormInput from './FormInput';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = React.useState('');

  function handleChange(evt) {
    setAvatar(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatar);
  }

  useEffect(() => {
    setAvatar('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить&nbsp;аватар"
      name="avatar"
      isOpen={isOpen}
      submitText="Обновить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <FormInput
        placeholder="Ссылка&nbsp;на&nbsp;картинку"
        type="url"
        name="avatar"
        onChange={handleChange}
        value={avatar}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
