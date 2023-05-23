import React from "react";
import { Link } from "react-router-dom";

export const GameTestsAdd = ( formArg) => {
  const {formArg: form, setFormArg: setForm, tests, round} = formArg;
  if (!tests.length) {
    return <p className="center">Тестів поки немає</p>
  }
  const changeCheck = (event) => {
    const id = event.target.id;
    if(id in form.rounds[round]) {
      setForm((form) => {
        delete form.rounds[round].id;
        return form;
      });
    } else {
      setForm((form) => {
        form.rounds[round][id] = id;
        return form;
      })
    }
  }
  return (
    <>
    <div>
      {tests.map((test, index) => {
        const check = test._id in form.rounds[round];
        return (
          <div key={test._id}>
            <label>
              {check && <input 
                  type='checkbox' 
                  id={test._id} 
                  name={index} 
                  value={test._id}
                  defaultChecked
                  onClick={changeCheck}
                />}
                {!check && <input 
                  type='checkbox' 
                  id={test._id} 
                  name={index} 
                  value={test._id}
                  onClick={changeCheck}
                />}
                <span></span>
              </label>  
            <span>{ index + 1 } </span>
            <Link to={`/tests/test/${test._id}`}>{ test.question }</ Link>
          </div>
        );
      }) }
    </div>
    </>
  );
}