import logo from "../images/header-logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, handleSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" alt="Лого" src={logo} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__data">
              <p className="header__email">{email}</p>
              <Link
                to="/sign-in"
                className="header__link header__link_out"
                onClick={handleSignOut}
              >
                Выйти
              </Link>
            </div>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
