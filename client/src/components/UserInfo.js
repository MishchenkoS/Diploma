import React from "react";
// import { Link } from "react-router-dom";

export const UserInfo = ({ user }) => {
console.log(user)
  return (
    <>
      <p>Login: {user.login}</p>
      <p>Имя: {user.firstname}</p>
      <p>Фамилия: {user.lastname}</p>
      <p>Роль: {user.role}</p>
      {user.group && <p>Группа: {user.group}</p>}
      {user.team &&<p>Команда: {user.team}</p>}
      <p>Дата регистрации: <strong>{new Date(user.created_date).toLocaleDateString()}</strong></p>
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