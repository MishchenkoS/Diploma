import React from "react";
// import { Link } from "react-router-dom";

export const TestInfo = ({ test }) => {

  return (
    <>
      <h2>Тест</h2>
  
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
    </>
  );
  
}