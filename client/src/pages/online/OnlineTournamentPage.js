// import e from "express";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from 'socket.io-client'
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
const socket = io();

export const OnlineTournamentPage = () => {
  const gameId = useParams().gameId;
  const [count, setCount] = useState(true);

  const {token, role, userId} = useContext(AuthContext);
  const [rounds, setRounds] = useState(null);
  const [players, setPlayers] = useState(null);
  const [playersConnect, setPlayersConnect] = useState(null);
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [tournamentId, setTournamentId] = useState(null);
  const [tournamentStatus, setTournamentStatus] = useState(null);
  const [roleGame, setRoleGame] = useState(null);
  const [countRound, setCountRound] = useState(null);
  const [testStatus, setTestStatus] = useState(null);
  const [playerAnswers, setPlayerAnswers] = useState(null);



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

  // console.log(countRound, 'countRound start');
  socket.emit('START_TEST', { id: event.target.id, round: event.target.name})
  const btn = document.createElement('button');
  btn.innerText = 'Остановить тест';
  btn.addEventListener('click', stopTest);
  btn.setAttribute('id', event.target.id);
  btn.setAttribute('name', event.target.name);
  console.log(btn);
  event.target.after(btn);
  event.target.style.display = 'none';
  
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
  const btn = document.createElement('button');
  btn.innerText = 'Начать тест';
  btn.addEventListener('click', startTest);
  btn.setAttribute('id', event.target.id);
  btn.setAttribute('name', event.target.name);
  console.log(btn);
  event.target.after(btn);
  event.target.style.display = 'none';
  // event.target.remove();
}

socket.on('STOP_TEST', (data) => {
  setPlayerAnswers(data.answers);
  setTestStatus('FINISH');
});

useEffect(()=>{
  if(count) {

    socket.emit('CONNECT', {userId, gameId});
    socket.on('CONNECT', (data) => {
      console.log(data)
      setRoleGame(data.roleGame);
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

}, [count, players]);

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
{tournamentStatus && <p>Статус турнира: {tournamentStatus}</p>}
{roleGame==="LEADING" && !tournamentStatus && <button onClick={createTournament}>Разрешить подключаться к игре</button>}
{testStatus !== 'FINISH' && players && <ul>
  {players.map((item)=>{
    console.log(item)
    if(playersConnect && playersConnect.indexOf(item.id) !== -1) {
      console.log(2)
      return <li style={{color: 'green'}} id={item.id}>{item.login}</li>
    }
    return <li id={item.id}>{item.login}</li>
    // {playersConnect && playersConnect.indexOf(item.id) !== -1 &&
    //   return <li id={item.id}>{item.login}</li>
    // }
   
  })}
</ul>}

{tournamentStatus === 'START' && testStatus === 'FINISH' && playerAnswers && <ul>
  {players.map((item)=>{
    console.log(item)
    if(item.id in playerAnswers) {
      if(test.true_answers.indexOf(playerAnswers[item.id]) !== -1){
        return <li style={{color: 'green'}} id={item.id}>{item.login} {playerAnswers[item.id]}</li>
      } 
      return <li style={{color: 'red'}} id={item.id}>{item.login} {playerAnswers[item.id]}</li>
    }
    return <li id={item.id}>{item.login}</li> 
  })}
</ul>}
{roleGame==="LEADING" && tournamentStatus === "CREATE" && <button onClick={startTournament}>Старт турнира</button>}

{roleGame==="LEADING" && tournamentStatus === "START" && rounds && <div onClick={getTestToLeading}>{rounds.map((item, index)=>{
  console.log(item);
  let roundsDOM = [(<span>Раунд {index + 1}</span>)];
  let i = 0;
  for(let key in item) {
    roundsDOM.push(<button id={key} name={index}> {i + 1} </button>);
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
  {!testStatus && <button id={test._id} name={countRound} onClick={startTest}>Начать тест</button>}
  {/* {testStatus==='START' && <button id={test._id} onClick={stopTest}>Начать тест</button>} */}
  
  </div>}


{test && roleGame === "PLAYER" && <div>
  <p> Сложность: {test.complexity} </p>
  <p>Вопрос: {test.question}</p>
  {test.type === 'WRITE' && <div>
    <input onChange={changeInput}></input>
  </div> }
  {test.type === 'RADIO' && <div>
  {test.answers.map((item)=>{
    return (<>
     <label>
      {<input 
        type='radio' 
        // name='true_answers' 
        // id={item}
        value={item} 
        className='with-gap'
        onChange={radio}
      />}
      <span className='span-radio'></span>
    </label>
    <label>{item}</label>
    </>)
  })}
    </div>}
  {test.type === 'CHECK' && <div> 
    {test.answers.map((item)=>{
      return(
       <>
       <label>
        <input 
          type='checkbox' 
          // id={index} 
          // name='true_answers'
          value={item}
          // checked
          onChange={check}
        />     
        <span></span>
        </label>  

        <label>{item}</label>
       </>
      );
    })}

  </div> }
  {testStatus === 'START' && <button onClick={reply}>Ответить</button>}
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