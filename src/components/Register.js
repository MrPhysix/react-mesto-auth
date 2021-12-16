import React, { useState } from 'react';
import FormInput from './FormInput';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function Register() {
  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    result: null,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (setStateAction) => (evt) => {
    setStateAction(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth.signUp(password, email).then((res) => {
      if (res.status === 400) setInfoTooltip({ isOpen: true, result: false });
      else setInfoTooltip({ isOpen: true, result: true });
    });
  };

  const handleInfoTooltipClose = () => {
    if (infoTooltip.result === true) navigate('/sign-in');
    setInfoTooltip({ isOpen: false, result: null });
  };
  return (
    <>
      <form className="sign" onSubmit={handleSubmit}>
        <h2 className="sign__title">Регистрация</h2>
        <FormInput
          className="sign__input"
          placeholder="Email"
          type="text"
          name="email"
          minLength="4"
          maxLength="30"
          onChange={handleChange(setEmail)}
          value={email}
          errorClass="sign__input_error"
        />
        <FormInput
          className="sign__input sign__input_secure"
          placeholder="Пароль"
          type="text"
          name="password"
          minLength="4"
          maxLength="30"
          onChange={handleChange(setPassword)}
          value={password}
          errorClass="sign__input_error"
        />
        <button className="sign__submit-button hover-anim" type="submit">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="sign__undertext">
          Уже зарегистрированы?&nbsp;<span>Войти</span>
        </Link>
      </form>
      <InfoTooltip //компонент модального окна об успешной (или не очень) регистрации.
        isOpen={infoTooltip.isOpen}
        onClose={handleInfoTooltipClose}
        result={infoTooltip.result}
      />
    </>
  );
}

export default Register;
