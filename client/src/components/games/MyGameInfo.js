import React, {useContext} from "react";

import { AuthContext } from "../../context/authContext";

export const MyGameInfo = (arg) => {
  const {game, players, leadings} = arg;
  const {userId} = useContext(AuthContext);
  const startGame = async () => {
    window.location.href = `/online/${game._id}`;
  }
  return (
    <>
    <div className='div-btn div-name-page'><h5>Игра</h5></div>
  <table className="striped">
    <thead>
      <tr>
        <th>Название</th>
        <th>Тип</th>
        <th>Дата создания</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>{game.nameGame}</td>
      <td>{game.type}</td>
      <td>{new Date(game.created_date).toLocaleDateString()}</td>
      </tr>
    </tbody>
  </table>
  <table className="striped">
    <thead>
      <tr>
        <th>Ведущие</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      {leadings.map((item, index) => {
          return (
            <td key={`${index}`}>
              <p>
              {item.login}
              </p>
            </td>
          );
      })
      }
      </tr>
    </tbody>
  </table>
  <table className="striped">
  <thead>
      <tr>
        <th>Игроки</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      {players.map((item, index) => {
        if(game.type === 'PLAYER') {
          return (
            <td key={`${index}`}>
              <p>
              {item.login}
              </p>
            </td>
          );
        }
        return (
          <td key={`${index}`}>
            {item}
          </td>
        );
      })}
      </tr>
    </tbody>
  </table>
  {leadings.find(x => x._id === userId)  &&
  <button onClick={startGame} className="btn waves-effect waves-light indigo lighten-1 btn-add ">
    Начать игру<i class="material-icons right">people</i></button>}
 


    </>
  );
}