import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegister }) => {
  const [dataUser, setDataUser] = useState({
    password: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setDataUser({
      ...dataUser,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ password: dataUser.password, email: dataUser.email });
  };

  return (
    <div className="authorization">
      <p className="authorization__title">Регистрация</p>
      <form className="authorization__form" onSubmit={handleSubmit}>
        <input
          className="authorization__input"
          name="email"
          type="email"
          value={dataUser.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="authorization__input"
          name="password"
          type="password"
          value={dataUser.password}
          onChange={handleChange}
          placeholder="Пароль"
          required
        />
        <button type="submit" className="authorization__button">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="authorization__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
};

export default Register;
