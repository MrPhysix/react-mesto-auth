import React from 'react';
import Popup from './Popup';
import authImageTrue from '../images/auth_img_true.svg';
import authImageFalse from '../images/auth_img_false.svg';

function InfoTooltip({ isOpen, onClose, result }) {
  return (
    <Popup isOpen={isOpen} name="info-tooltip" onClose={onClose}>
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
    </Popup>
  );
}

export default InfoTooltip;
