import React from "react";
import { Link } from "react-router-dom";

export const TestsInfo = ({ tests }) => {

  if (!tests.length) {
    return <p className="center">Тестов пока нет</p>
  }

  return (
    <>
    <div><Link to={`/tests/addTest`} className="waves-effect accent-4 waves-light btn ">button</Link></div>
    <div>
      {tests.map((test, index) => {
        return (
          <div key={`${test._id}`}>
            <span>{ index + 1 } </span>
            <Link to={`/tests/test/${test._id}`}>{ test.question }</ Link>
            
          </div>
        );
      }) }
    </div>
    </>
  );
}