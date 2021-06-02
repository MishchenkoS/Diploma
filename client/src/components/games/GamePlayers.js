import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";

export const GamePlayers = (formArg) => {
  
  const {formArg: form, setFormArg: setForm, users} = formArg;

  const changeCheck = (event) => {
    setForm(()=>{
      form.players = [...form.players, event.target.id];
      return form;
    })
  }
  
  if (!users.length) {
    return <p className="center">Пользователей пока нет</p>
  }

  return (
    <div>
      {users.map((user, index) => {
        return (
          <div key={user._id}>
            <label>
              <input 
                type='checkbox' 
                id={user._id} 
                name={user._id} 
                value={user._id}
                // onClick={clickCheck}
                onClick={changeCheck}
              />
              <span></span>
            </label>  
            <span>{ index + 1 } </span>
            <Link to={`/users/${user._id}`}>{ user.login }</ Link>

            
            
          </div>
        );
      }) }
    </div>
  );
}