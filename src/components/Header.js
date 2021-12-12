import Logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <a href="./index.html">
        <img className="header__logo" src={Logo} alt="Место Россия" />
      </a>
    </header>
  );
}

export default Header;
