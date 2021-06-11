import React, { useContext, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { Loader } from "../Loader";

export const MyTournamentInfo = (arg) => {
  const {tournament, game, rounds, leadings, players} = arg;
  console.log(tournament, 'tournament')
  console.log(game, 'game');
  console.log(rounds, 'rounds');
  const {token, role} = useContext(AuthContext);
  const {request, loading} = useHttp();

  const getBalls = useCallback(() => {
    const content = [];
    for(let key in tournament.balls) {
      const user = players.find(item => item.id === key);
      console.log(user, 'user')
      console.log(players, 'players')
      content.push(<p><span>{user.login}</span> : {tournament.balls[key]}</p>)
    }
    return content;
  }, [players])

  return ( 
  <>
  <p>Статус турнира: {tournament.status}</p>
  <p>Название игры: <Link to={`/games/game/${game._id}`}>{game.nameGame}</Link></p>
  <p>Дата проведения турнира: {new Date(tournament.created_date).toLocaleDateString()}</p>
  <div>
    <p>Очки за турнир:</p>
    {getBalls()}
  </div>

  <div>
    {rounds.map((round, index) => {
      const roundDOM = [<p>Раунд №{index+1}</p>];
      round.map((item)=>{

        roundDOM.push(<span>Тест : </span>);
        roundDOM.push(<p>Вопрос : {item.testId.question}</p>);
        for(let key in item.testId.answers) {
          console.log(item, 'item')
          console.log(key, 'key')
          const indexTrue = item.testId.true_answers.indexOf(item.testId.answers[key]);
          console.log(item.testId.answers[key], 'item.answers[key]');
          console.log(indexTrue, 'indexTrue')
          if(indexTrue !== -1) {
            console.log('if')
            roundDOM.push(<li><b>{item.testId.answers[key]}</b></li>);
          } else {
            console.log('else')
            roundDOM.push(<li>{item.testId.answers[key]}</li>);
          }
        }
        roundDOM.push(<p>Ответы игроков : </p>);
        console.log(item.responders, 'item.responders');
        for(let key of item.responders){
          const user = players.find(key1 => key1.id === key);
          console.log(players)
          console.log(key, 'key')
          roundDOM.push(<p><span>{user.login}</span> : {item.answers[key]}</p>);
        }
      });
      return roundDOM;
    })}
  </div>
  

  </>
  )


}
