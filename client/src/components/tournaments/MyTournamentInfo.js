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

  const getRound = (round) => {
    const roundDOM = [];
    round.map((item)=>{

      roundDOM.push(<>
        <hr className="hr-line-end"/>
        <p className="flex-center">Тест : </p>
      </>);
      roundDOM.push(<p className="question flex-center">Вопрос : {item.testId.question}</p>);
      for(let key in item.testId.answers) {
          roundDOM.push(<li className="flex-center">{item.testId.answers[key]}</li>);
      }
      roundDOM.push(<p className="text-bold">Ответы игроков : </p>);
      for(let key of item.responders){
        const user = players.find(key1 => key1.id === key);
        console.log(players)
        console.log(key, 'key')
        roundDOM.push(<><p><span>{user.login}</span> : {item.answers[key]}</p></>);
      }
    });

    return roundDOM;

  }

  return ( 
  <>
  <p className="text-center">Статус турнира: {tournament.status}</p>
  <p className="text-center">Название игры: <Link to={`/games/game/${game._id}`}> {game.nameGame}</Link></p>
  <p className="text-italic">Дата проведения турнира: {new Date(tournament.created_date).toLocaleDateString()}</p>
  <div>
    <p className="text-bold">Очки за турнир:</p>
    {getBalls()}
  </div>

  <div>
    {rounds.map((round, index) => {
      // const roundDOM = [<><hr className="hr-line-end"/><p className="text-bold text-italic flex-center">Раунд №{index+1}</p></>];
      
      return <>
      
      <div className="border-line">
        <p className="text-bold text-italic flex-center">Раунд №{index+1}</p>
        {getRound(round)}
      </div>
      </>

      // return roundDOM;
    })}
  </div>
  

  </>
  )


}
