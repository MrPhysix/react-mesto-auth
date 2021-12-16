import React from 'react';

function FormInput({
  className,
  placeholder,
  type,
  name,
  minLength,
  maxLength,
  onChange,
  value,
  errorClass,
}) {
  function handleChange(evt) {
    onChange && onChange(evt);
  }

  return (
    <>
      <input
        placeholder={placeholder}
        className={className}
        type={type}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        required
        onChange={handleChange}
        value={value ? value : ''}
      />
      <span id={`${name}-error`} className={errorClass} />
    </>
  );
}

export default FormInput;
