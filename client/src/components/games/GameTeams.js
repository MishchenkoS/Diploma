import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { Loader } from "../Loader";
import { GamePlayers } from "./GamePlayers";
import { Link } from "react-router-dom";


export const GameTeams = (formArg) => {
  const {formArg: form, setFormArg: setForm, users} = formArg;
  // console.log(formArg)

  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [teams, setTeams] = useState([]);



  if(!loading && users.length) {
    users.map((item)=>{
      if(item.team) {
        const index = teams.indexOf(item.team);
        if(index === -1) {
          setTeams([...teams, item.team]);
        }
      }
    });
  }

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

  if (!teams.length || !users.length) {
    return <p className="center">Команд пока нет</p>
  }

  return(
    <div>
      <div className='div-btn'><h6>Выбрать команды</h6></div>
      {teams.map((team, index) => {
        const check = form.players.indexOf(team) === -1 ? false : true;
        return (
          <div key={index}>
            <label>
              {check && <input 
                type='checkbox' 
                id={team} 
                name={team} 
                value={team}
                checked
                onClick={changeCheck}
              />}
              {!check && <input 
                type='checkbox' 
                id={team} 
                name={team} 
                value={team}
                onClick={changeCheck}
              />}
              <span></span>
            </label>  
            <span>{ index + 1 } </span>
            <span>{ team}</span>

            
            
          </div>
        );
      }) }
    </div>
  );
}