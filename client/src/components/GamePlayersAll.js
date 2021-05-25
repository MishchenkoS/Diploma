import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/httpHooks";
import { Loader } from "../components/Loader";
import { GamePlayers } from "../components/GamePlayers";
import { Link } from "react-router-dom";


export const GamePlayersAll = (formArg) => {

  const {formArg: form, setFormArg: setForm, users} = formArg;
  // console.log(formArg)

  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  



  const changeCheck = (event) => {
    const index = form.players.indexOf(event.target.id);

    if(index === -1) {
        setForm((form) => {
          const players = [...form.players, event.target.id];
          return {...form, players};
        })
    } else {
      setForm((form)=>{
        const players = [...form.players];
        players.splice(index, 1);
        return {...form, players};
      })
    }

    console.log(form)
  }
  
  if (!users.length) {
    return <p className="center">Пользователей пока нет</p>
  }

  return (
    <div>
      <div className='div-btn'><h6>Выбрать игроков</h6></div>
      {users.map((user, index) => {
        const check = form.players.indexOf(user._id) === -1 ? false : true;

        {console.log(user)}
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
      }) }
    </div>
  );

  // return(
  //   <>
  //    {!loading && <GamePlayers users={users} formArg={form} setFormArg={setForm}></GamePlayers>}
  //   </>
  // );
}