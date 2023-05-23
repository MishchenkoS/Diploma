import React, { useContext, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";

export const GameInfo = (arg) => {
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const {game, players, leadings, rounds} = arg;
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);


  const getTest = (item) => {
    const testDOM = []
    for(let key in item) {
      testDOM.push(
        <Link to={`/tests/test/${item[key]._id}`} className="collection-item">
          <span>{item[key].question} </span>
        <i class="material-icons right">arrow_forward</i></Link>
        ) 
    }
    return testDOM;
  }

  const changeGame = () => {
    window.location.href = `/games/changeGame/${game._id}`;
  }

  const deleteGame = async () => {
    try {
      const fetched = await request(`/api/games/game/${game._id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`
      });
      window.location.href = "/games";      
    } catch(error) {
    }
  }

  const startGame = async () => {
    window.location.href = `/online/${game._id}`;
  }

  return (
    <>
    <div className='div-btn div-name-page'><h5>Гра</h5></div>
  <table className="striped">
    <thead>
      <tr>
        <th>Назва</th>
        <th>Тип</th>
        <th>Дата створення</th>
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
        <th>Ведучі</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      {leadings.map((item, index) => {
          return (
            <td key={`${index}`}>
              <Link to={`/users/user/${game.leadings[index]}`}>
              {item.login}
              </Link>
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
        <th>Гравці</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      {players.map((item, index) => {
        if(game.type === 'PLAYER') {
          return (
            <td key={`${index}`}>
              <Link to={`/users/user/${game.players[index]}`}>
              {item.login}
              </Link>
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
      {rounds.map((item, index) => {
        let testInRound = [<p >Раунд №{index+1}</p>];
        testInRound.push(<div className="collection">{getTest(item)}</div>)
        return testInRound;
      })}
   <div className='div-btn-game'>
      <button onClick={changeGame} className="btn waves-effect waves-light indigo lighten-1 btn-add ">
          Редагувати гру<i class="material-icons right">edit</i></button>
        <button onClick={deleteGame} className="btn waves-effect waves-light indigo lighten-1 btn-add">
          Видалити гру<i class="material-icons right">delete</i></button>
        <button onClick={startGame} className="btn waves-effect waves-light indigo lighten-1 btn-add ">
          Розпочати гру<i class="material-icons right">people</i></button>
          </div>
    </>
  );
}