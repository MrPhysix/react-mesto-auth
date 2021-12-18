import React from 'react';

function FormElement({
  children,
  className,
  name,
  handleSubmit,
  isLoading,
  submitText,
  buttonClassName,
  underText,
}) {
  return (
    <form className={className} name={name} onSubmit={handleSubmit}>
      {children}
      <button className={buttonClassName} type="submit">
        {!isLoading ? submitText : 'Сохранение..'}
      </button>
      {underText}
    </form>
  );
}

export default FormElement;
