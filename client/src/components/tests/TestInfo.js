import React, {useCallback, useContext, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";

export const TestInfo = ({ test }) => {
  const {loading, error, request, clearError} = useHttp();
  const {token} = useContext(AuthContext);
  const testId = useParams().testId;
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, []);
  
  const deleteTest = async () => {
    try {
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


  return (
    <>
            <Link to={`/photo/${testId}`}>TEST</Link>
       <div className='div-btn div-name-page'><h5>Тест</h5></div>
      <table className="striped">
        <thead>
          <tr>
            <th>Складність</th>
            <th>Тип</th>
            <th>Запитання</th>
            <th>Варіанти відповіді</th>
            <th>Дата створення</th>
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
      <div className='div-btn-test'>
      <button onClick={changeTest} className="btn waves-effect waves-light indigo lighten-1 btn-add ">
          Редагувати тест<i className="material-icons right">edit</i></button>

        <button onClick={deleteTest} className="btn waves-effect waves-light indigo lighten-1 btn-add">
          Видалити тест<i className="material-icons right">delete</i></button></div>

    </>
  );
  
}