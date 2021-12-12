import React from 'react';

function FormInput({
  placeholder,
  type,
  name,
  minLength,
  maxLength,
  onChange,
  value,
}) {
  function handleChange(evt) {
    onChange && onChange(evt);
  }

  return (
    <>
      <input
        placeholder={placeholder}
        className="popup__input"
        type={type}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        required
        onChange={handleChange}
        value={value ? value : ''}
      />
      <span id={`${name}-error`} className="popup__error" />
    </>
  );
}

export default FormInput;
