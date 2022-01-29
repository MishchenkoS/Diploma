import React from "react";
import { Link } from "react-router-dom";

export const GameLeadingsAll = (formArg) => {
  const {formArg: form, setFormArg: setForm, users} = formArg;

  const changeCheck = (event) => {
    const index = form.leadings.indexOf(event.target.id);
    if(index === -1) {
        setForm((form) => {
          const leadings = [...form.leadings, event.target.id];
          return {...form, leadings};
        })
    } else {
      setForm((form)=>{
        const leadings = [...form.leadings];
        leadings.splice(index, 1);
        return {...form, leadings};
      })
    }
  }
  
  if (!users.length) {
    return <p className="center">Ведущих пока нет</p>
  }

  return (
    <div>
      <div className='div-btn'><h6>Выбрать ведущих</h6></div>
      {users.map((user, index) => {
        if(user.role==="LEADING" || user.role==="ADMIN"){
          const check = form.leadings.indexOf(user._id) === -1 ? false : true;
          return (
            <div key={user._id}>
              <label>
                {check && <input 
                  type='checkbox' 
                  id={user._id} 
                  name={user._id} 
                  value={user._id}
                  checked
                  onClick={changeCheck}
                />}
                {!check && <input 
                  type='checkbox' 
                  id={user._id} 
                  name={user._id} 
                  value={user._id}
                  onClick={changeCheck}
                />}
                <span></span>
              </label>  
              <span>{ index + 1 } </span>
              <Link to={`/users/${user._id}`}>{ user.login }</ Link>
            </div>
          );
        }
      }) }
    </div>
  );
}