// import e from "express";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from 'socket.io-client'
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";

export const OnlineTournamentPage = () => {
  const gameId = useParams().gameId;
  const [count, setCount] = useState(true);

  const {token, role, userId} = useContext(AuthContext);
  const [rounds, setRounds] = useState(null);
  const [players, setPlayers] = useState(null)
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [tournamentId, setTournamentId] = useState(null)


// window.addEventListener('load', () => {


// });



const getTestToLeading = (event) => {
  return rounds[event.name].event.id;
}

const createTournament = () => {

}


useEffect(()=>{
  if(count) {
    const socket = io();


    //пользователь переходит на страницу игры
    socket.emit('CREATE', {message: gameId, userId});
    //если пользователь - это ведущий, то создать турнир 
    socket.on('CREATE', (data) => {
      if(data.resolution) {
        socket.emit('CREATE_TOURNAMENT', { message: gameId});
      }
    });

    //после создания турнира получить всех игроков, которые принимают участие
    socket.on('CREATE_TOURNAMENT', (data)=>{
      //получить всех игроков
      console.log(data)
      setPlayers(data.players)
      setTournamentId(data.id)
    });



    if(players) {
      socket.emit('')
    }



    

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



return <>
<div>
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
</form>

</>

}