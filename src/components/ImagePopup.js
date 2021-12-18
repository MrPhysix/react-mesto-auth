import Popup from './Popup';

function ImagePopup({ title, image, isOpen, onClose }) {
  return (
    <Popup isOpen={isOpen} name="image" onClose={onClose} image={true}>
      <img className="popup__image" src={image} alt={title} />
      <h3 className="popup__title" id="image-open-title">
        {title}
      </h3>
    </Popup>
  );
}

export default ImagePopup;
