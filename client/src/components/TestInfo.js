import React, {useCallback, useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/httpHooks";
import { useMessage } from "../hooks/messageHook";
// import { Link } from "react-router-dom";


export const TestInfo = ({ test }) => {
  const {loading, error, request, clearError} = useHttp();
  const {token} = useContext(AuthContext);
  const testId = useParams().testId;
  const message = useMessage();
  // console.log("test", testId)

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, []);
  
  const deleteTest = async () => {
    try {
      // console.log("testid",testId)
      const fetched = await request(`/api/tests/${testId}`, "DELETE", null, {
        Authorization: `Bearer ${token}`
      });
      window.location.href = "/tests";      
    } catch(error) {

    }
  }

  const changeTest = () => {
    window.location.href = `/tests/changeTest/${testId}`;
  }
  // const getTest = useCallback ( async () => {
  //   try {
  //     const fetched = await request(`/api/tests/${test._id}`, "GET", null, {
  //       Authorization: `Bearer ${token}`
  //     });
      
  //   } catch(error) {

  //   }
  // }, [token, request, testId]);

  return (
    <>
       <div className='div-btn div-name-page'><h5>Тест</h5></div>
      <table className="striped">
        <thead>
          <tr>
            <th>Сложность</th>
            <th>Тип</th>
            <th>Вопрос</th>
            <th>Варианты ответа</th>
            <th>Дата создания</th>
          </tr>
         </thead>
         <tbody>
          <tr>
              <td>{test.complexity}</td>
              <td>{test.type}</td>
              <td>{test.question}</td>
              <td>
              {test.answers.map((item, index) => {
                if(test.true_answers.includes(item)) {
                  return (
                    <tr>
                    {test.img_answers[index] && 
                    <img src={`${test.img_answers[index]}`}></img>}
                    <b>{item}</b>
                    </tr>
                    
                );}
                return (
                  <tr>
                    {test.img_answers[index] && 
                    <img src={`${test.img_answers[index]}`}></img>}
                    {item}
                  </tr>
                  
                );
              })}
              </td>
              <td>{new Date(test.created_date).toLocaleDateString()}</td>
            </tr>
            
         </tbody>
        </table>


      {/* <p>Сложность: {test.complexity}</p>
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
      <p>Дата создания: <strong>{new Date(test.created_date).toLocaleDateString()}</strong></p> */}
{/* <div className='div-btn'>
        </div> */}

      <div className='div-btn-test'>
      <button onClick={changeTest} className="btn waves-effect waves-light indigo lighten-1 btn-add ">
          Изменить тест<i className="material-icons right">edit</i></button>

        <button onClick={deleteTest} className="btn waves-effect waves-light indigo lighten-1 btn-add">
          Удалить тест<i className="material-icons right">delete</i></button></div>
    </>
  );
  
}