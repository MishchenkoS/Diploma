import React, {useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";
// import { Link } from "react-router-dom";

export const UserInfo = ({ user }) => {
  const {loading, error, request, clearError} = useHttp();
  const {token, role} = useContext(AuthContext);
  const userId = useParams().userId;
  const message = useMessage();

  const deleteUser = async () => {
    try {
      console.log(userId)
      const fetched = await request(`/api/users/me/admin/profile/${userId}`, "DELETE", null, {
        Authorization: `Bearer ${token}`
      });
      window.location.href = "/users";      
    } catch(error) {

    }
  }

  const changeUser = () => {
    window.location.href = `/users/changeUser/${userId}`;
  }

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  return (
    <>
    <div className='div-btn div-name-page'><h5>Пользователь</h5></div>
    <table className="striped about-me">
    <thead>
      <tr>
        <th>Login</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Роль</th>
        <th>Группа</th>
        <th>Команда</th>
        <th>Дата регистрации</th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user.login}</td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{user.role}</td>
          <td>{user.group}</td>
          <td>{user.team}</td>
          <td>{new Date(user.created_date).toLocaleDateString()}</td>
        </tr>
      </tbody>
    </table>

    {role==="ADMIN" && <div className='div-btn-test'>
      <button onClick={changeUser} className="btn waves-effect waves-light indigo lighten-1 btn-add ">
          Изменить данные<i className="material-icons right">edit</i></button>

        <button onClick={deleteUser} className="btn waves-effect waves-light indigo lighten-1 btn-add">
          Удалить пользователя<i className="material-icons right">delete</i></button></div>}

      {/* <p>Login: </p>
      <p>Имя: {user.firstname}</p>
      <p>Фамилия: {user.lastname}</p>
      <p>Роль: {user.role}</p>
      {user.group && <p>Группа: {user.group}</p>}
      {user.team &&<p>Команда: {user.team}</p>}
      <p>Дата регистрации: <strong>{new Date(user.created_date).toLocaleDateString()}</strong></p> */}
      {/* <h2>Тест</h2>
  
      <p>Сложность: {test.complexity}</p>
      <p>Тип: {test.type}</p>
      <p>Вопрос: {test.question}</p>
      {test.img_question &&
      <img src={`${test.img_question}`}></img>
      }

      


      <p>Варианты ответа: 
        {test.answers.map((item, index) => {
          if(test.true_answer.includes(item)) {
            return (
            <li key={`${index}`}>
              {test.img_answers[index] && 
              <img src={`${test.img_answers[index]}`}></img>}
              <b>{item}</b>
            </li>
          );}
          return (
            <li key={`${index}`}>
              {test.img_answers[index] && 
              <img src={`${test.img_answers[index]}`}></img>}
              {item}
            </li>
          );
        })}
      </p>
      <p>Дата создания: <strong>{new Date(test.created_date).toLocaleDateString()}</strong></p>
    </> */}
    </>
  );
  
}