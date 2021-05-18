import React, { useState, useContext, useEffect, useCallback } from "react";
import { Loader } from "../../components/Loader"; 
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { TestInfo } from "../../components/TestInfo";
import { useMessage } from "../../hooks/messageHook";
import { RadioTests } from "../../components/RadioTest";

export const TestAddPage = () => {
  const {token} = useContext(AuthContext);

  const message = useMessage();

  const {loading, error, request, clearError} = useHttp();
  const [type, setType] = useState(null);

  // const [form, setForm] = useState({
  //   login: "",
  //   password: "",
  //   firstname: "",
  //   lastname: "",
  //   group: "",
  //   team: ""
  // });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    // setForm({...form, [event.target.name]: event.target.value});
    setType(event.target.value)
  }

  // const registerHandler = async () => {
  //   try {
  //     const data = await request('/api/auth/register', 'POST', {...form});
  //     message(data.message);
  //   } catch (error) {
      
  //   }
 
  // }

  useEffect(() => {
    var select = document.querySelectorAll('select');
    var instances = window.M.FormSelect.init(select, {
    });
  }, []);

  return (
    <>
      <div>
        <h2>Создать новый тест</h2>
      </div>
      <div className="col s12 darken-1">
      <label>Выберите тип теста</label>
        <select onChange={changeHandler}>
          <option value="" disabled selected>---</option>
          <option value="RADIO">Один вариант ответа</option>
          <option value="CHECK">Несколько вариантов ответа</option>
          <option value="WRITE">Вписать значение в поле</option>
  
        </select>

      </div>
      {type==="RADIO" && <RadioTests></RadioTests>}
    </>
    // <div>
    //   <div className="input-field">
    //     <input 
    //       placeholder="Введите login"
    //       id="login"
    //       type="text"
    //       name="login"
    //       onChange={changeHandler}
    //       value={form.login}
    //     />
    //     <label htmlFor="login">Login</label>
    //   </div>

    //   <div className="input-field">
    //     <input 
    //       placeholder="Введите пароль"
    //       id="password"
    //       type="password"
    //       name="password"
    //       onChange={changeHandler}
    //       value={form.password}
    //     />
    //     <label htmlFor="password">Пароль</label>
    //   </div>

    //   <div className="input-field">
    //     <input 
    //       placeholder="Введите имя"
    //       id="firstname"
    //       type="text"
    //       name="firstname"
    //       onChange={changeHandler}
    //       value={form.firstname}
    //     />
    //     <label htmlFor="firstname">Имя</label>
    //   </div>

    //   <div className="input-field">
    //     <input 
    //       placeholder="Введите фамилию"
    //       id="lastname"
    //       type="text"
    //       name="lastname"
    //       onChange={changeHandler}
    //       value={form.lastname}
    //     />
    //     <label htmlFor="lastname">Фамилия</label>
    //   </div>

    //   <div className="input-field">
    //     <input 
    //       placeholder="Введите группу"
    //       id="group"
    //       type="text"
    //       name="group"
    //       onChange={changeHandler}
    //       value={form.group}
    //     />
    //     <label htmlFor="group">Группа</label>
    //   </div>

    //   <div className="input-field">
    //     <input 
    //       placeholder="Введите команду"
    //       id="team"
    //       type="text"
    //       name="team"
    //       onChange={changeHandler}
    //       value={form.team}
    //     />
    //     <label htmlFor="team">Команда</label>
    //   </div>

    //   <div className="input-field">
    //     <button 
    //     type="submit" 
    //     onClick={registerHandler}
    //     disabled={loading}
    //     >
    //       Зарегистрировать
    //     </button>
    //   </div>

    //   {/* <a href="/login">Login</a> */}
    // </div>

  );

}