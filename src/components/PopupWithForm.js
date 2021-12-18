import Popup from './Popup';
import FormElement from './FormElement';
import { IsLoadingContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  submitText,
  onClose,
  onSubmit,
}) {
  const isLoading = useContext(IsLoadingContext);

  function handleSubmit(evt) {
    onSubmit(evt);
  }

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h3 className="popup__title">{title}</h3>
      <FormElement
        className="popup__form"
        name={name}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        submitText={submitText}
        buttonClassName="popup__submit-button"
      >
        {children}
      </FormElement>
    </Popup>
  );
}

export default PopupWithForm;
