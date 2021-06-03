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



// window.addEventListener('load', () => {


// });



const getTestToLeading = (event) => {
  let name = event.target.name;
  let id = event.target.id;
  console.log(rounds[name][id]);
  console.log(event.target.id)
  console.log(event.target.name)
  // console.log()


}

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
  setPlayers(data.players);
  setPlayersConnect(data.playersConnect);
  setTournamentId(data.id);
  setTournamentStatus(data.status);
  console.log(data.players)
  console.log(data.playersConnect)
  console.log(data.status)
  // const li = document.getElementById(data.userId);
  // li.style.color = "green";
});

const startTournament = () => {
  socket.emit('START', {gameId, tournamentId});
}

socket.on('START', (data) => {
  setTournamentStatus(data.status);
  if(roleGame === "LEADING") {
    setRounds(data.rounds);
  }
});



useEffect(()=>{
  if(count) {

    socket.emit('CONNECT', {userId, gameId});
    socket.on('CONNECT', (data) => {
      console.log(data.roleGame)
      setRoleGame(data.roleGame);
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


return <>
{tournamentStatus && <p>Статус турнира: {tournamentStatus}</p>}
{roleGame==="LEADING" && !tournamentStatus && <button onClick={createTournament}>Разрешить подключаться к игре</button>}
{players && <ul>
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

})} </div>}



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

</>

}