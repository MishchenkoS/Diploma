import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/httpHooks";
import { Loader } from "../components/Loader";
import { GamePlayers } from "../components/GamePlayers";
import { Link } from "react-router-dom";


export const GameLeadingsAll = (formArg) => {
  const {formArg: form, setFormArg: setForm, users} = formArg;
  // console.log()

  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  



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

    console.log(form)
  }
  
  if (!users.length) {
    return <p className="center">Ведущих пока нет</p>
  }

  return (
    <div>
      <div className='div-btn'><h6>Выбрать ведущих</h6></div>
      {users.map((user, index) => {
        if(user.role==="LEADING" || user.role==="ADMIN"){
          const check = form.players.indexOf(user._id) === -1 ? false : true;
          return (
            <div key={user._id}>
              <label>
                {check && <input 
                  type='checkbox' 
                  id={user._id} 
                  name={user._id} 
                  value={user._id}
                  checked
                  // onClick={clickCheck}
                  onClick={changeCheck}
                />}
                {!check && <input 
                  type='checkbox' 
                  id={user._id} 
                  name={user._id} 
                  value={user._id}
                  // onClick={clickCheck}
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

  // return(
  //   <>
  //    {!loading && <GamePlayers users={users} formArg={form} setFormArg={setForm}></GamePlayers>}
  //   </>
  // );
}