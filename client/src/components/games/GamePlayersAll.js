import React from "react";
import { Link } from "react-router-dom";

export const GamePlayersAll = (formArg) => {
  const {formArg: form, setFormArg: setForm, users} = formArg;

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
  }
  
  if (!users.length) {
    return <p className="center">Пользователей пока нет</p>
  }

  return (
    <div>
      <div className='div-btn'><h6>Выбрать игроков</h6></div>
      {users.map((user, index) => {
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
      }) }
    </div>
  );

}