import { useState } from "react";

const Login = ({ handleLogin }) => {
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
    if (!dataUser.email || !dataUser.password) {
      return;
    }
    handleLogin({ password: dataUser.password, email: dataUser.email });
  };

  return (
    <div className="authorization">
      <p className="authorization__title">Вход</p>
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
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
