import React from "react";
import { Link } from "react-router-dom";

export const TestsInfo = ({ tests }) => {

  if (!tests.length) {
    return (
      <>
      <div class='div-btn'><Link to={`/tests/addTest`} 
      className="btn waves-effect waves-light indigo lighten-1 btn-add"
      >Создать новый тест<i class="material-icons right">control_point</i></Link></div>
      <p className="center">Тестов пока нет</p>
      </>
    )
  }

  return (
    <>
    <div className='div-btn'><Link to={`/tests/addTest`} 
    className="btn waves-effect waves-light indigo lighten-1 btn-add"
    // className="btn waves-effect waves-light light-blue darken-3 btn-add"
    >Создать новый тест<i class="material-icons right">control_point</i></Link></div>
    <div className='div-btn div-name-page'><h5>Список доступных тестов</h5></div>
    <div className="collection">
      {tests.map((test, index) => {
        return (
          // <div key={test._id} className="collection-item ">
            <Link key={test._id} to={`/tests/test/${test._id}`} className="collection-item ">
            <span>{ index + 1 } </span>
            { test.question }
            <i class="material-icons right">arrow_forward</i>
            </ Link>
            
          // </div>
        );
      }) }
    </div>
    </>
  );
}