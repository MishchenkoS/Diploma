import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";


export const LoginPage = () => {

  const message = useMessage();

  const {loading, error, request, clearError} = useHttp();

  const [form, setForm] = useState({
    login: "",
    password: "",
    firstname: "",
    lastname: "",
    group: "",
    team: ""
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

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (error) {
      
    }
 
  }

  return (
    <div>
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

      <div className="input-field">
        <input 
          placeholder="Введите имя"
          id="firstname"
          type="text"
          name="firstname"
          onChange={changeHandler}
          value={form.firstname}
        />
        <label htmlFor="firstname">Имя</label>
      </div>

      <div className="input-field">
        <input 
          placeholder="Введите фамилию"
          id="lastname"
          type="text"
          name="lastname"
          onChange={changeHandler}
          value={form.lastname}
        />
        <label htmlFor="lastname">Фамилия</label>
      </div>

      <div className="input-field">
        <input 
          placeholder="Введите группу"
          id="group"
          type="text"
          name="group"
          onChange={changeHandler}
          value={form.group}
        />
        <label htmlFor="group">Группа</label>
      </div>

      <div className="input-field">
        <input 
          placeholder="Введите команду"
          id="team"
          type="text"
          name="team"
          onChange={changeHandler}
          value={form.team}
        />
        <label htmlFor="team">Команда</label>
      </div>

      <div className="input-field">
        <button 
        type="submit" 
        onClick={registerHandler}
        disabled={loading}
        >
          Зарегистрировать
        </button>
      </div>

      {/* <a href="/login">Login</a> */}
    </div>




  );
}