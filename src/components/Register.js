import { useState } from 'react';
import FormInput from './FormInput';
import FormElement from './FormElement';
import { Link } from 'react-router-dom';

function Register({ handleSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (setStateAction) => (evt) => {
    setStateAction(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSignUp(password, email);
  };

  return (
    <>
      <FormElement
        className="sign"
        name="register"
        handleSubmit={handleSubmit}
        submitText="Зарегистрироваться"
        buttonClassName="sign__submit-button hover-anim"
        underText={
          <Link to="/sign-in" className="sign__undertext">
            Уже зарегистрированы?&nbsp;<span>Войти</span>
          </Link>
        }
      >
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
      </FormElement>
    </>
  );
}

export default Register;
