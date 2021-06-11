// import e from "express";
import React, { useCallback, useContext, useEffect, useState } from "react";
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

  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [rounds, setRounds] = useState(null);
  const [countRound, setCountRound] = useState(null);
  const [testStatus, setTestStatus] = useState(null);

  const clearError = useCallback(() => setError(null), []);


// window.addEventListener('load', () => {


// });





const createTournament = (event) => {
  socket.emit('CREATE', {gameId});
  // alert('CREATE emit')
  event.target.style.display = 'none';
}

socket.on('CREATE', (data) => {
  // alert('CREATE')
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
  // alert('START emit')
  socket.emit('START', {gameId, tournamentId});
}

socket.on('START', (data) => {
  // alert('START')
  setPlayersConnect(null);
  setTournamentStatus(data.status);
  setRounds(data.rounds);
  
});

const getTestToLeading = (event) => {
  let name = event.target.name;
  console.log(name, 'name')
  let id = event.target.id;
  setCountRound((countRound)=>{return name})
  setTest(rounds[name][id]);
  console.log(countRound, 'countRound get')
}

const startTest = (event) => {
  // alert('START_TEST emit')
  console.log(event.target)
  console.log(event.target.name, 'name')
  setReplyPlayer(null)
  // console.log(countRound, 'countRound start');
  socket.emit('START_TEST', { id: event.target.id, round: event.target.name})
  // const btn = document.createElement('button');
  // btn.innerText = 'Остановить тест';
  // btn.addEventListener('click', stopTest);
  // btn.setAttribute('id', event.target.id);
  // btn.setAttribute('name', event.target.name);
  // console.log(btn);
  // event.target.after(btn);
  // event.target.style.display = 'none';
  
  // event.target.remove();!!!!
}

socket.on('START_TEST', (data) => {
  // alert('START_TEST')
  // console.log(rounds)
  // console.log(roleGame);
  // console.log(test);
  // console.log(players);
  // console.log(tournamentId);
  setTest(data.test);
  setAnswers([])
  setTestStatus(data.status);
})

const reply = () => {
  setTestStatus('REPLY');
  socket.emit('REPLY', {
    userId,
    answers
  });
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
  console.log(answers)
  const index = answers.indexOf(event.target.value);

  if(index === -1) {
    setAnswers((answers) => {
      const answ = [...answers, event.target.value];
      return [...answ];
    })
  //     setForm((form) => {
  //       const true_answers = [...form.true_answers, +event.target.id];
  //       return {...form, true_answers};
  //     })
  } else {
    setAnswers((answers)=>{
      const answ = [...answers];
      answ.splice(index, 1);
      return [...answ];
    });
  //   setForm((form)=>{
  //     const true_answers = [...form.true_answers];
  //     true_answers.splice(index, 1);
  //     return {...form, true_answers};
  //   })
  }
}

const stopTest = (event) => {
  socket.emit('STOP_TEST', { id: event.target.id, round: event.target.name});
  // const btn = document.createElement('button');
  // btn.innerText = 'Начать тест';
  // btn.addEventListener('click', startTest);
  // btn.setAttribute('id', event.target.id);
  // btn.setAttribute('name', event.target.name);
  // console.log(btn);
  // event.target.after(btn);
  // event.target.style.display = 'none';
  // event.target.remove();
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
      console.log(data)
      if(data.message) {
        // throw new Error(data.message);
        setError(data.message);
      } else {
        setRoleGame(data.roleGame);
        setNameGame(data.nameGame);
        if(data.status === 'CREATE') {
          setPlayers(data.players);
          setPlayersConnect(data.playersConnect);
          setTournamentStatus(data.status);
          setTournamentId(data.id);
        } else if(data.status === 'START') {
      
          console.log(data.rounds)
          setPlayers(data.players);
          setTournamentStatus(data.status);
          setTournamentId(data.id);
          setRounds(data.rounds);
          setTest(data.test);
          setTestStatus(data.statusTest)
          setCountRound(()=>data.countRound);
        }
      }   
    })



    // socket.on('CREATE', (data) => {
    //   if(data.resolution) {
    //     socket.emit('CREATE_TOURNAMENT', { message: gameId});
    //   }
    // });

    // //после создания турнира получить всех игроков, которые принимают участие
    // socket.on('CREATE_TOURNAMENT', (data)=>{
    //   //получить всех игроков
    //   console.log(data)
    //   setPlayers(data.players)
    //   setTournamentId(data.id)
    // });



    // if(players) {
    //   socket.emit('')
    // }



    

    // создали игру
    // if(role==="ADMIN"){
    //   socket.emit('CREATE_TOURNAMENT', { message: gameId});
    // } else if(role==="STUDENT") {
    //   socket.emit('CONNECT_PLAYER', { message: token});
    //   console.log(2)
    // }

    // // //запуск игры
    // // // socket.emit('CREATE_TOURNAMENT', { message: gameId});

    // socket.on('CREATE_TOURNAMENT', (data)=>{
    //   //получить всех игроков
    //   console.log(data)
    //   setPlayers(data.players)
    //   setTournamentId(data.id)
    // })

    // //подключился игрок
    // if(players) {
    //   socket.emit('CONNECT_PLAYER', {token});
    //   socket.on('CONNECT_PLAYER', (data) => {
    //     //Получили кто подключился
    //     // setTournamentId(data.id);
        
    //     const player = document.getElementById(`${data.id}`)
        
    //     player.innerHTML += "<i className='material-icons'>check</i>"
  
    //     console.log(data);
  
  
    //   });
    // }


    // //старт игры
    // const start = document.getElementById('start');
    // start.addEventListener('click', ()=>{
    //   socket.emit('START_TOURNAMENT', {tournamentId, gameId});
    // })

    // //загрузка раундов для админа
    // socket.on('ROUNDS', (data)=>{
    //   console.log(data)
    //   setRounds(data);
    // });


    // //получение теста для админа
    // socket.emit("GET_TEST_LEADING", {"test": 'id'})
    // socket.on("GET_TEST_LEADING", (test) => {
    //   console.log(test);
    //   setTest(test);
    // });

    // //отправка тестов игрокам. Получение ими его
    // const startTest = document.getElementById('startTest');
    // start.addEventListener('click', ()=>{
    //   socket.emit('GET_TEST', {message: 'id'});
    // })
    // socket.on('GET_TEST', (test) => {
    //   setTest(test);
    // });

    // //Игрок ответил
    // socket.emit("ANSWER", {
    //   'test': 'id',
    //   'round':'nomer',
    //   'answers': 'answers',
    //   'user':'iduser'
    // });
    // //сообщение что игрок ответил
    // socket.on('PLAYER_ANSWER', (data) => {
    //   console.log(data)
    // })

    // //admin заканчивает тест или же время истекло 
    // socket.emit('TEST_FINISH', {"test":'id'})
    // //Вывод правильных ответов и кто как ответил
    // socket.on('TRUE_ANSWER',(data)=>{
    //   console.log(data);
    // })

    // //Игра закончена
    // socket.emit('GAME_FINISH', {message:"idtournament"})
    // //Результаты турнира
    // socket.on('RESULT_TOURNAMENT', (data)=>{
    //   console.log(data)
    // })


    // const form = document.getElementById('form');
    // const input = document.getElementById('input');
    // const messages = document.getElementById('messages');
    // form.addEventListener('submit', (e)=>{
    //   e.preventDefault();
    //   if(input.value) {
    //     socket.emit('NEW_CHAT_MESSAGE', {message: input.value});
    //     input.value="";
    //   }
    // });
  
    // socket.on('PUSH_CHAT_MESSAGE', (data) => {
    //   const item = document.createElement('li');
    //   item.textContent = data.message;
    //   messages.appendChild(item);
    //   window.scrollTo(0, document.body.scrollHeight);
    // });

    setCount(false);
  }

}, [count]);

useEffect(() => {
  message(error);
  clearError();
}, [error, message, clearError]);

// if(!players) {
//   return <Loader></Loader>
// }

if(!roleGame && !players) {
  return <Loader></Loader>
}

console.log(rounds)
console.log(test)
console.log(roleGame);
console.log(testStatus, 349)


return (
<>
<div class='online-name-status col s12'> 
{nameGame && <span>Название игры: {nameGame}</span>}
{tournamentStatus && <span>Статус турнира: {tournamentStatus}</span>}
</div>
{roleGame==="LEADING" && !tournamentStatus &&
<div className="input-field div-btn">
<button onClick={createTournament} className="btn waves-effect waves-light indigo lighten-1 my-btn">Разрешить подключаться к игре</button>
</div> }

{roleGame==="LEADING" && tournamentStatus === "CREATE" && <div className="input-field div-btn">
  <button  className="btn waves-effect waves-light indigo lighten-1 my-btn" onClick={startTournament}>Старт турнира</button>
  </div>
}

{tournamentStatus === 'START' && roleGame === 'LEADING' && <div className="input-field div-btn">
<button onClick={stopTournament}
className="btn waves-effect waves-light indigo lighten-1 my-btn"
>Остановить турнир</button>
</div>}

<div className="main-online col s12">
  <div className="players-online col s6">

{tournamentStatus === 'CREATE' && players && 
<ul>
  {players.map((item)=>{
    console.log(item)
    if(playersConnect && playersConnect.indexOf(item.id) !== -1) {
      console.log(2)
      return <li style={{color: 'green'}} id={item.id}>{item.login}</li>
    }
    return <li id={item.id}>{item.login}</li>  
  })}
</ul>}

{tournamentStatus === 'START' && testStatus !== 'FINISH' && 
<ul>
  {players.map((item)=>{
    console.log(item, 380)
    if(replyPlayer && (item.id in replyPlayer)) {
        return <li style={{color: 'green'}} id={item.id}>{item.login}</li>
    }
    return <li id={item.id}>{item.login}</li> 
  })}
</ul>}

{tournamentStatus === 'START' && testStatus === 'FINISH' && playerAnswers && replyPlayer && 
<ul>
  {players.map((item)=>{
    console.log(item)
    if(item.id in playerAnswers) {
      if(replyPlayer[item.id]){
        return <li style={{color: 'green'}} id={item.id}>{item.login} {playerAnswers[item.id]}</li>
      } 
      return <li style={{color: 'red'}} id={item.id}>{item.login} {playerAnswers[item.id]}</li>
    }
    return <li style={{color: 'red'}} id={item.id}>{item.login}</li> 
  })}
</ul>}

</div>
<div className="rounds-online col s6 offset-s6">

{roleGame==="LEADING" && tournamentStatus === "START" && rounds && <div onClick={getTestToLeading}>{rounds.map((item, index)=>{
  console.log(item);
  let roundsDOM = [(<p>Раунд {index + 1}</p>)];
  let i = 0;
  for(let key in item) {
    roundsDOM.push(<button id={key} name={index} className="btn waves-effect waves-light indigo lighten-1 btn-round"> {i + 1} </button>);
    i++;
  }

  return roundsDOM;
  // <span>Раунд {index+1}</span>

})} 
</div>}

{test && roleGame==="LEADING" && <div>
  <p> Сложность: {test.complexity} </p>
  <p> Тип: {test.type} </p>
  <p> Вопрос: {test.question}</p>
  <ul>
  {test.answers.map((item)=>{
    return <li>{item}</li>
  })}
  </ul>
  {testStatus!=='START' && <button id={test._id} name={countRound} onClick={startTest} className="btn waves-effect waves-light indigo lighten-1 my-btn"
  >Начать тест</button>}
  {testStatus==='START' && <button id={test._id} onClick={stopTest} className="btn waves-effect waves-light indigo lighten-1 my-btn"
  >Остановить тест</button>}

  </div>}


{test && roleGame === "PLAYER" && <div>
  <p>Раунд: {countRound}</p>
  <p>Сложность: {test.complexity} </p>
  <p>Вопрос: {test.question}</p>
  {test.type === 'WRITE' && <div>
  {testStatus === 'START' && <input onChange={changeInput}></input>}
  {testStatus !== 'START' && <input disabled onChange={changeInput}></input>}
  </div> }
  {test.type === 'RADIO' && <div>
  {test.answers.map((item)=>{
    return (<>
     {testStatus === 'START' && <label>
      <input 
        type='radio' 
        name='true_answers' 
        // id={item}
        value={item} 
        className='with-gap'
        onChange={radio}
      />
      <span className='span-radio'></span>
    </label>}
    {testStatus !== 'START' &&  <label>
      <input 
        type='radio' 
        name='true_answers' 
        disabled
        value={item} 
        className='with-gap'
        onChange={radio}
      />
      <span className='span-radio'></span>
    </label>}
    <label>{item}</label>
    </>)
  })}
    </div>}
  {test.type === 'CHECK' && <div> 
    {test.answers.map((item)=>{
      return(
       <>
        {testStatus === 'START' && <label>
        <input 
          type='checkbox' 
          // id={index} 
          name='true_answers'
          value={item}
          // checked
          onChange={check}
        />     
        <span></span>
        </label>}
        {testStatus !== 'START' && <label>
        <input 
          type='checkbox' 
          // id={index} 
          name='true_answers'
          value={item}
          disabled
          onChange={check}
        />     
        <span></span>
        </label>}
        <label>{item}</label>
       </>
      );
    })}

  </div> }
  {testStatus === 'START' && <button onClick={reply} className="btn waves-effect waves-light indigo lighten-1 my-btn"
  >Ответить</button>}
  </div>}


{test && roleGame === 'VIEWER' && <div>
  <p> Сложность: {test.complexity} </p>
  <p> Тип: {test.type} </p>
  <p> Вопрос: {test.question}</p>
  <ul>
  {test.answers.map((item)=>{
    return <li>{item}</li>
  })}
  </ul>
  </div>}



{balls && <div>
  <ul>{getBalls()}</ul>
  </div>}

    
  </div>
</div>

{/* <div>
  <ul>
  {players && players.map((item)=>{
    return <li id={item.id}>{item.login}</li>
  })}
  </ul>
  {!players && <Loader></Loader>}
</div>

<button id="start">Начать игру</button>
<button onClick={getTestToLeading}></button>
<button id="startTest">Начать тест</button>
<button id="answer"></button>

<form id="form">
  <input id="input"></input>
  <button type='submit'>Submit</button>
</form> */}

</>);

}