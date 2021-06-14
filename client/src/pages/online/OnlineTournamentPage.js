import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from 'socket.io-client'
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
const socket = io();

export const OnlineTournamentPage = () => {
  const gameId = useParams().gameId;
  const message = useMessage();
  const [error, setError] = useState(null)

  const [count, setCount] = useState(true);
  const [tournamentId, setTournamentId] = useState(null);
  const [tournamentStatus, setTournamentStatus] = useState(null);
  const [nameGame, setNameGame] = useState(null);

  const {token, role, userId} = useContext(AuthContext);
  const [roleGame, setRoleGame] = useState(null);
  const [players, setPlayers] = useState(null);
  const [playersConnect, setPlayersConnect] = useState(null);
  const [playerAnswers, setPlayerAnswers] = useState(null);
  const [replyPlayer, setReplyPlayer] = useState(null);
  const [balls, setBalls] = useState(null);
  const [team, setTeam] = useState(null);

  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [rounds, setRounds] = useState(null);
  const [testStatus, setTestStatus] = useState(null);
  const countRound = useRef(null);

  const clearError = useCallback(() => setError(null), []);

const createTournament = (event) => {
  socket.emit('CREATE', {gameId});
  event.target.style.display = 'none';
}

socket.on('CREATE', (data) => {
  setPlayers(data.players);
  setTournamentId(data.id);
  setTournamentStatus(data.status);
});

socket.on('CONNECT_PLAYER', (data) =>{
  alert('CONNECT_PLAYER');
  const li = document.getElementById(data.userId);
  li.style.color = "green";
});

const startTournament = () => {
  socket.emit('START', {gameId, tournamentId});
}

socket.on('START', (data) => {
  setPlayersConnect(null);
  setTournamentStatus(data.status);
  setRounds(data.rounds);
});

const getTestToLeading = (event) => {
  let name = event.target.name;
  let id = event.target.id;
  countRound.current = name;
  setTest(rounds[name][id]);
}

const startTest = (event) => {
  setReplyPlayer(null)
  socket.emit('START_TEST', { id: event.target.id, round: countRound.current})
}

socket.on('START_TEST', (data) => {
  setTest(data.test);
  setAnswers([])
  setTestStatus(data.status);
})

const reply = () => {
  setTestStatus('REPLY');
  if(team) {
    socket.emit('REPLY', {
      userId: team,
      answers
    });
  } else {
    socket.emit('REPLY', {
      userId,
      answers
    });
  }

}

socket.on('REPLY', (data) => {
  setReplyPlayer(data.reply)
  const li = document.getElementById(data.userId);
  li.style.color = "green";
})

const changeInput = (event) => {
  setAnswers([event.target.value]);
}

const radio = (event) => {
  setAnswers([event.target.value])
}

const check = (event) => {
  const index = answers.indexOf(event.target.value);

  if(index === -1) {
    setAnswers((answers) => {
      const answ = [...answers, event.target.value];
      return [...answ];
    })
  } else {
    setAnswers((answers)=>{
      const answ = [...answers];
      answ.splice(index, 1);
      return [...answ];
    });
  }
}

const stopTest = (event) => {
  socket.emit('STOP_TEST', { id: event.target.id, round: event.target.name});
}



socket.on('STOP_TEST', (data) => {
  setPlayerAnswers(data.answers);
  setReplyPlayer(data.reply)
  setTestStatus('FINISH');
});

const stopTournament = (event) => {
  socket.emit('STOP_TOURNAMENT');
}

socket.on('STOP_TOURNAMENT', (data) => {
  setBalls(data.balls);
  setTestStatus('FINISH');
  setTournamentStatus('FINISH');
  setTournamentId(null);
  setNameGame(null);
  setPlayersConnect(null);
  setReplyPlayer(null);
  setTest(null);
  setAnswers([]);
  setRounds(null);
  countRound.current = null;
});

const getBalls = () => {
  const content = [];
  for(let key in balls) {
    const user = players.find(item => item.id === key);
    content.push(<li><span>{user.login} : </span> <span>{balls[key]}</span></li>)
  }
  return content;
}




useEffect(()=>{
  if(count) {
    if(!gameId) {
      socket.emit('CONNECT', {userId});
    } else {
      socket.emit('CONNECT', {userId, gameId});
    }

    socket.on('CONNECT', (data) => {
      if(data.message) {
        setError(data.message);
      } else {
        setRoleGame(data.roleGame);
        setNameGame(data.nameGame);
        if(data.status === 'CREATE') {
          setPlayers(data.players);
          setPlayersConnect(data.playersConnect);
          setTournamentStatus(data.status);
          setTournamentId(data.id);
          if(data.team) {
            setTeam(data.team)
          }
        } else if(data.status === 'START') {
          setPlayers(data.players);
          setTournamentStatus(data.status);
          setTournamentId(data.id);
          setRounds(data.rounds);
          setTest(data.test);
          setTestStatus(data.statusTest)
          setReplyPlayer(data.replyGlobal)
          countRound.current = data.countRound;
          if(data.team) {
            setTeam(data.team)
          }
        }
      }   
    });

    setCount(false);
  }

}, [count]);

useEffect(() => {
  message(error);
  clearError();
}, [error, message, clearError]);


if(!roleGame && !players) {
  return <Loader></Loader>
}

return (
<>
<div className='row'>

  <div className='online-name-status col s12'> 
    {nameGame && <span>Название игры: {nameGame}</span>}
    {tournamentStatus && <span>Статус турнира: {tournamentStatus}</span>}
  </div>

  {roleGame==="LEADING" && !tournamentStatus &&
  <div className="input-field div-btn col s12">
    <button onClick={createTournament} className="btn waves-effect waves-light indigo lighten-1 my-btn">
      Разрешить подключаться к игре
    </button>
  </div> }

  {roleGame==="LEADING" && tournamentStatus === "CREATE" && 
  <div className="input-field div-btn col s12">
    <button  className="btn waves-effect waves-light indigo lighten-1 my-btn" onClick={startTournament}>
      Старт турнира
    </button>
  </div>}

  {tournamentStatus === 'START' && roleGame === 'LEADING' && 
  <div className="input-field div-btn col s12">
    <button onClick={stopTournament}
      className="btn waves-effect waves-light indigo lighten-1 my-btn">
      Остановить турнир
    </button>
  </div>}

  <div className="main-online col s12">
    <div className="players-online col s4">
      {tournamentStatus === 'CREATE' && players && 
      <ul>
        <h5>Список Игроков:</h5>
        <hr className="listname-line-2"></hr>
        {players.map((item, i)=>{
          if(playersConnect && playersConnect.indexOf(item.id) !== -1) {
            return (<> 
              <li style={{color: 'green'}} id={item.id}>{item.login}</li>
              <hr className="listname-line"></hr>
            </>)
          }
          return (<>
            <li id={item.id}>{item.login}</li>
            <hr className="listname-line"></hr>
          </>)
        })}
      </ul>}

      {tournamentStatus === 'START' && testStatus !== 'FINISH' && 
      <ul>
        <h5>Список Игроков:</h5>
        <hr className="listname-line-2"></hr>
        {players.map((item)=>{
          if(replyPlayer && (item.id in replyPlayer)) {
            return (<>
              <li style={{color: 'green'}} id={item.id}>{item.login}</li>
              <hr className="listname-line"></hr>
            </>)
          }
          return (<>
            <li id={item.id}>{item.login}</li> 
            <hr className="listname-line"></hr>
          </>)
        })}
      </ul>}

      {tournamentStatus === 'START' && testStatus === 'FINISH' && playerAnswers && replyPlayer && 
      <ul>
        <h5>Список Игроков:</h5>
        <hr className="listname-line-2"></hr>
        {players.map((item)=>{
          if(item.id in playerAnswers) {
            if(replyPlayer[item.id]){
              return (<>
                <li className="listname-answer" style={{color: 'green'}} id={item.id}>{item.login} {playerAnswers[item.id]}</li>
                <hr className="listname-line"></hr>
              </>);
            } 
            return (<> 
              <li className="listname-answer" style={{color: 'red'}} id={item.id}>{item.login} {playerAnswers[item.id]}</li>
              <hr className="listname-line"></hr>
            </>);
          }
          return (<> 
            <li className="listname-answer" style={{color: 'red'}} id={item.id}>{item.login}</li> 
            <hr className="listname-line"></hr>
          </>);
        })}
      </ul>}

    </div>

    <div className="col s4 question-online">
      {test && roleGame==="LEADING" && 
      <div>
        <p> Сложность: {test.complexity} </p>
        <p> Тип: {test.type} </p>
        <p className="question"> Вопрос: {test.question}?</p>
        <ul>
          {test.answers.map((item)=>{
            return <li>{item}</li>
          })}
        </ul>
        {testStatus!=='START' && 
        <button id={test._id} onClick={startTest} 
          className="btn waves-effect waves-light indigo lighten-1 my-btn question-start">
          Начать тест
        </button>}
        {testStatus==='START' && 
        <button id={test._id} onClick={stopTest} 
          className="btn waves-effect waves-light indigo lighten-1 my-btn question-start">
          Остановить тест
        </button>}

      </div>}
    
    

      {test && roleGame === "PLAYER" && 
      <div>
        <p>Раунд: {countRound.current}</p>
        <p>Сложность: {test.complexity} </p>
        <p className="question">Вопрос: {test.question}?</p>

        {test.type === 'WRITE' && 
        <div>
          {testStatus === 'START' && 
          <input onChange={changeInput}></input>}
          {testStatus !== 'START' && 
          <input disabled onChange={changeInput}></input>}
        </div> }

        {test.type === 'RADIO' && 
        <div>
          {test.answers.map((item)=>{
            return (
            <>
            {testStatus === 'START' && 
            <div>
              <label>
                <input 
                  type='radio' 
                  name='true_answers' 
                  value={item} 
                  className='with-gap'
                  onChange={radio}
                />
                <span className='span-radio'></span>
              </label>
              <label className="text-item">{item}</label>
            </div>}
            {testStatus !== 'START' &&  
            <div>
              <label>
                <input 
                  type='radio' 
                  name='true_answers' 
                  disabled
                  value={item} 
                  className='with-gap'
                  onChange={radio}
                />
                <span className='span-radio'></span>
              </label>
              <label className="text-item">{item}</label>
            </div>}
            </>)
          })}
        </div>}

        {test.type === 'CHECK' && 
        <div> 
          {test.answers.map((item)=>{
            return(
            <>
              {testStatus === 'START' && 
              <div>
                <label>
                <input 
                  type='checkbox' 
                  name='true_answers'
                  value={item}
                  onChange={check}
                />     
                <span></span>
                </label>
                <label className="text-item">{item}</label>
              </div>}
              {testStatus !== 'START' &&
              <div>
                <label>
                <input 
                  type='checkbox' 
                  name='true_answers'
                  value={item}
                  disabled
                  onChange={check}
                />     
                <span></span>
                </label>
                <label className="text-item">{item}</label>
              </div>}
            </>
            );
          })}

        </div> }

        {testStatus === 'START' && 
        <button onClick={reply} 
          className="btn waves-effect waves-light indigo lighten-1 my-btn question-start">
          Ответить
        </button>}
      </div>}


      {test && roleGame === 'VIEWER' && 
      <div>
        <p> Сложность: {test.complexity} </p>
        <p> Тип: {test.type} </p>
        <p className="question"> Вопрос: {test.question}?</p>
        <ul>
          {test.answers.map((item)=>{
            return <li>{item}</li>
          })}
        </ul>
      </div>}

      {balls && 
      <div>
        <ul>{getBalls()}</ul>
      </div>}

    
    </div>

    <div className="rounds-online col s4">

      {roleGame==="LEADING" && tournamentStatus === "START" && rounds && 
      <div onClick={getTestToLeading}>
        {rounds.map((item, index)=>{
        let roundsDOM = [(<p>Раунд {index + 1}</p>)];
        let i = 0;
        for(let key in item) {
          roundsDOM.push(
          <button id={key} name={index} className="btn waves-effect waves-light indigo lighten-1 btn-round"> 
            {i + 1} 
          </button>
          );
          i++;
        }
        return roundsDOM;
        })} 
      </div>}
    </div>
  </div>
</div>


</>);

}