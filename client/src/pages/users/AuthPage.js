import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, error, request, clearError} = useHttp();
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.jwtToken, data.userId, data.role);
    } catch (error) {
      
    }
  }

  return (
    <div className="row">
      <div className="input-field">
        <input 
          placeholder="Введите login"
          id="login"
          type="text"
          name="login"
          onChange={changeHandler}
          value={form.login}
        />
        <label htmlFor="login">Login</label>
      </div>

      <div className="input-field">
        <input 
          placeholder="Введите пароль"
          id="password"
          type="password"
          name="password"
          onChange={changeHandler}
          value={form.password}
        />
        <label htmlFor="password">Пароль</label>
      </div>
      <button
        type="submit" 
        disabled={loading}
        onClick={loginHandler}
      >
        Login
      </button>
    </div>
  );
}