import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";
import { useParams } from "react-router-dom";

export const LoginPage = (formArg) => {
  const {token} = useContext(AuthContext);
  const message = useMessage();
  const userId = useParams().userId;
  const {loading, error, request, clearError} = useHttp();
  const [password, setPassword] = useState("");

  console.log(formArg.ok)

  let [form, setForm] = useState({
    login: "",
    password: "",
    firstname: "",
    lastname: "",
    group: "",
    team: "",
    role: "STUDENT"
  });

  if(formArg.ok) {
    form = formArg.form;
    setForm = formArg.setForm;
    // setType(form.type);
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
  }


  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  useEffect(() => {
    const select = document.querySelectorAll('select');
    const instances = window.M.FormSelect.init(select, {});
  }, []);

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
  }

  const registerHandler = async () => {
    try {
      if(password) {
        setForm({...form, password})
      }

      if(formArg.ok) {
        const data =  await request(`/api/users/me/admin/changeUser/${userId}`, 'PATCH', {...form}, {
          Authorization: `Bearer ${token}`
        });
        message(data.message);
        window.location.href = `/users/user/${userId}`;
      } else {
        const data = await request('/api/auth/register', 'POST', {...form});
        message(data.message);
        setForm({
          login: "",
          password: "",
          firstname: "",
          lastname: "",
          group: "",
          team: "",
          role: "STUDENT"
        })
      }
    } catch (error) {
      message(error);
    }
  }

  return (
    <div className="div-login">
      <div className="input-field">
        <input 
          placeholder="?????????????? login"
          id="login"
          type="text"
          name="login"
          autoComplete="off"
          onChange={changeHandler}
          value={form.login}
        />
        <label htmlFor="login">Login</label>
      </div>

      {!formArg.ok && <div className="input-field">
        <input 
          placeholder="?????????????? ????????????"
          id="password"
          type="password"
          name="password"
          autoComplete="off"
          onChange={changeHandler}
          value={form.password}
        />
        <label htmlFor="password">????????????</label>
      </div>}

      {formArg.ok && <>
       <div className="input-field">
       <input 
         placeholder="?????????????? ????????????"
         id="password"
         type="password"
         name="password"
         autoComplete="off"
         value={password}
         onChange={changePassword}
       />
       <label htmlFor="password">????????????</label>
      </div>
     </>}

      <div className="input-field">
        <input 
          placeholder="?????????????? ??????"
          id="firstname"
          type="text"
          name="firstname"
          autoComplete="off"
          onChange={changeHandler}
          value={form.firstname}
        />
        <label htmlFor="firstname">??????</label>
      </div>

      <div className="input-field">
        <input 
          placeholder="?????????????? ??????????????"
          id="lastname"
          type="text"
          name="lastname"
          autoComplete="off"
          onChange={changeHandler}
          value={form.lastname}
        />
        <label htmlFor="lastname">??????????????</label>
      </div>

      <div className="input-field">
        <input 
          placeholder="?????????????? ????????????"
          id="group"
          type="text"
          name="group"
          autoComplete="off"
          onChange={changeHandler}
          value={form.group}
        />
        <label htmlFor="group">????????????</label>
      </div>

      <div className="input-field">
        <input 
          placeholder="?????????????? ??????????????"
          id="team"
          type="text"
          name="team"
          autoComplete="off"
          onChange={changeHandler}
          value={form.team}
        />
        <label htmlFor="team">??????????????</label>
      </div>
      <div className="col s12 darken-1 ">
      <label>???????????????? ????????</label>
        <select defaultValue={form.role} name="role" onChange={changeHandler} required>
          <option value="" disabled>---</option>
          <option value="STUDENT">????????????????????????</option>
          <option value="LEADING">??????????????</option>
          <option value="ADMIN">??????????????????????????</option>
        </select>
      </div>

      {!formArg.ok &&<div className="input-field div-btn">
        <button 
        type="submit" 
        onClick={registerHandler}
        disabled={loading}
        className="btn waves-effect waves-light indigo lighten-1 my-btn"
        >
          ????????????????????????????????
          <i class="material-icons right">assignment_ind</i>
        </button>
      </div>}

      {formArg.ok &&<div className="input-field div-btn">
        <button 
        type="submit" 
        onClick={registerHandler}
        disabled={loading}
        className="btn waves-effect waves-light indigo lighten-1 my-btn"
        >
          ???????????????? ????????????
          <i class="material-icons right">assignment_ind</i>
        </button>
      </div>}

      {/* <a href="/login">Login</a> */}
    </div>




  );
}