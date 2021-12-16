import React, { useState } from 'react';
import FormInput from './FormInput';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

//  cactus.jack@ya.ru
//  123456

function Login({ onLogin }) {
  const currentUser = React.useContext(CurrentUserContext);
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
    auth.signIn(password, email).then((res) => {
      if (res && res.status !== 400 && res.status !== 401) {
        getUserInfo(res.token);
        onLogin(true);
        navigate('/');
      } else setInfoTooltip({ isOpen: true, result: false });
    });
  };

  const handleInfoTooltipClose = () => {
    if (infoTooltip.result === true) navigate('/sign-in');
    setInfoTooltip({ isOpen: false, result: null });
  };

  const getUserInfo = (token) => {
    auth.checkToken(token).then((data) => {
      currentUser.email = data.data.email;
    });
  };
  return (
    <>
      <form className="sign" onSubmit={handleSubmit}>
        <h2 className="sign__title">Вход</h2>
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
          Войти
        </button>
      </form>
      <InfoTooltip //компонент модального окна об успешной (или не очень) регистрации.
        isOpen={infoTooltip.isOpen}
        onClose={handleInfoTooltipClose}
        result={infoTooltip.result}
      />
    </>
  );
}

export default Login;
