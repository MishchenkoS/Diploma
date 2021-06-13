require('dotenv').config(); //Загрузка переменных из среды .env

const mongoose = require('mongoose'); 
const express = require('express');
const GridFS = require('mongoose-gridfs');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const { createBucket } = require('mongoose-gridfs');
// const WebSocket = require('ws');

const {JWT_SECRET} = require('./config');
const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');
const testsRouter = require('./routers/testsRouter');
const gamesRouter = require('./routers/gamesRouter');
const tournamentsRouter = require('./routers/tournamentRouter');

const { Tournament } = require('./models/tournamentModel'); 
const tournamentDao = require('./dao/tournamentDao');
const { Game } = require('./models/gameModel');
const gameDao = require('./dao/gameDao');
const userDao = require('./dao/userDao');
const testDao = require('./dao/testDao');

const PORT = process.env.PORT || 8080;   
// const ws = new WebSocket('ws://locallhost:8080');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const storage = createBucket(); // createBucket(optns)
// const upload = multer({ storage });

app.use(express.json());
app.use(express.static('build'))
app.use(morgan('tiny'));

app.use('/api/auth', authRouter);
app.use('/api/users/me', usersRouter);
app.use('/api/tests', testsRouter);
app.use('/api/games', gamesRouter);
app.use('/api/tournaments', tournamentsRouter);
app.use((err, req, res, next) => res.status(500).json({message: err.message}));





// const onConnection = (socket) => {
//   // выводим сообщение о подключении пользователя
//   console.log('User connected')

//   // получаем название комнаты из строки запроса "рукопожатия"
//   const { roomId } = socket.handshake.query
//   // сохраняем название комнаты в соответствующем свойстве сокета
//   socket.roomId = roomId

//   // присоединяемся к комнате (входим в нее)
//   socket.join(roomId)

//   // регистрируем обработчики
//   // обратите внимание на передаваемые аргументы
  
//   // registerMessageHandlers(io, socket)
//   // registerUserHandlers(io, socket)  

//   // обрабатываем отключение сокета-пользователя
//   socket.on('disconnect', () => {
//     // выводим сообщение
//     log('User disconnected')
//     // покидаем комнату
//     socket.leave(roomId)
//   })
// }

// // обрабатываем подключение
// io.on('connection', onConnection)

let tournamentStatusGlobal;
let tournamentIdGlobal;
let nameGame;
let gameIdGlobal;

let roundsGlobal;
let testIdGlobal;
let testStatusGlobal;
let roundNumberGlobal;

const playersResultGlobal = [];
const playersConnectGlobal = [];
let replyGlobal = {};


io.on('connection', (socket) =>{
  console.log('New user connected');


  socket.on('CONNECT', async (data) => {
    console.log(data.gameId,' data.gameId');
    console.log(gameIdGlobal, 'gameIdGlobal');
    if(!data.gameId && !gameIdGlobal) {
        io.emit('CONNECT', {message: "Нет начатых игр"});
    }

    const gameInfo = gameIdGlobal ? 
      await gameDao.findGameById(gameIdGlobal) : 
      await gameDao.findGameById(data.gameId);

    if(!gameIdGlobal) {
      gameIdGlobal = data.gameId;
    }
    // const gameInfo = await gameDao.findGameById(data.gameId);
    const leadings = gameInfo.leadings;
    const players = gameInfo.players;
    nameGame = gameInfo.nameGame;
    let role = "VIEWER";
    // let flag = true;

    // if(!tournamentStatusGlobal || tournamentStatusGlobal === 'CREATE') {
      if(leadings.indexOf(data.userId) !== -1) {
        role = "LEADING";
      } else if(players.indexOf(data.userId) !== -1) {
        role = "PLAYER";
      } 
    // } 

    playersResultGlobal.length = 0; 

    for(let i = 0; i < players.length; i++) {
      const userProfileInfo = await userDao.findUserById(players[i]);
      playersResultGlobal.push({login: userProfileInfo.login, id:userProfileInfo._id});
    }


    // for(let i = 0; i < leadings.length; i++) {
    //   if(leadings[i] == data.userId) {
    //     role = "LEADING";
    //     flag = false;
    //     break;
    //   }
    // }

    // for(let i = 0; i < players.length; i++) {

    // }
    console.log(role)


    if(role==="PLAYER") {
      playersConnectGlobal.push(data.userId);
    }

    // console.log(tournamentStatus) 
    if(!tournamentStatusGlobal) {
      io.emit("CONNECT", {roleGame: role, nameGame});

    } else if(tournamentStatusGlobal === 'CREATE') {

      io.emit('CONNECT', {
        roleGame: role,
        playersConnect: playersConnectGlobal, 
        players: playersResultGlobal, 
        status: tournamentStatusGlobal,
        id: tournamentIdGlobal, 
        nameGame
      });

      if(role === 'PLAYER') {
        io.emit("CONNECT_PLAYER", {  
          userId: data.userId, 
        });
      }
    } else if(tournamentStatusGlobal === 'START') { 
      console.log(roundsGlobal)
      console.log(testIdGlobal)
      console.log(roundNumberGlobal);
      io.emit('CONNECT', { 
        roleGame: role,
        players: playersResultGlobal, 
        status: tournamentStatusGlobal,
        rounds: roundsGlobal,
        id: tournamentIdGlobal,
        test: roundsGlobal && testIdGlobal && roundsGlobal[roundNumberGlobal][testIdGlobal],
        statusTest: testStatusGlobal,
        countRound: roundNumberGlobal,
        nameGame
      });
    }
  });

  socket.on('CREATE', async (data) => {
    console.log(data);
    // const gameInfo = await gameDao.findGameById(data.gameId);
    const id = mongoose.Types.ObjectId();
    const newTournament = new Tournament({ 
      gameId: data.gameId, 
      status: "CREATE",  
      balls: {},
      _id: id
    });
    // const players = gameInfo.players;
    // const playersResult = [];
    // for(let i = 0; i < players.length; i++) {
    //   const userProfileInfo = await userDao.findUserById(players[i]);
    //   playersResult.push({login: userProfileInfo.login, id:userProfileInfo._id});
    // }
    tournamentIdGlobal = id;
    tournamentStatusGlobal = "CREATE";
    await newTournament.save();
    io.emit('CREATE', {
      players: playersResultGlobal, 
      id:id, 
      status: tournamentStatusGlobal
    });
  });  

  socket.on('START', async (data) => {
    const gameInfo = await gameDao.findGameById(data.gameId);
    await tournamentDao.findTournamentAndUpdateById(data.tournamentId, 'status', 'START');
    
    const rounds = [];
    for(let i = 0; i < gameInfo.rounds.length; i++) {
      rounds.push({});
      for(let key in gameInfo.rounds[i]) {
        const test = await testDao.findTestById(key);
        rounds[i][key] = test;
      }
    }
    
    roundsGlobal = [...rounds];

    console.log(rounds, 163)
    tournamentStatusGlobal = 'START';
    
    io.emit('START', {
      rounds: rounds, 
      status: tournamentStatusGlobal
    });
  });


  socket.on('START_TEST', async (data) => {
    console.log(data.round, 219)
    replyGlobal = {};
    roundNumberGlobal = data.round;
    testIdGlobal = data.id; 
    testStatusGlobal = 'START';  

    const tournament = await tournamentDao.findTournamentById(tournamentIdGlobal);
    console.log(tournament.rounds);
    console.log(roundNumberGlobal);

    if(!tournament.rounds[roundNumberGlobal]) {
      console.log(1)
      for(let i = 0; i <= roundNumberGlobal; i++) {
        if(!tournament.rounds[i]) {
          console.log(2)
          tournament.rounds.push([]);
          console.log(tournament.rounds);
        }
      }
    }
    tournament.rounds[roundNumberGlobal].push({
      testId: testIdGlobal,
      status: testStatusGlobal
    })
    await tournament.updateOne({rounds: tournament.rounds});
    
    io.emit('START_TEST', {
      test: roundsGlobal[data.round][data.id],  
      status: testStatusGlobal
    });
  });
      
  socket.on('REPLY', async (data) => { 
    const tournament = await tournamentDao.findTournamentById(tournamentIdGlobal);
    console.log(data.userId, "data.userId"); 
    for(let i = 0; i < tournament.rounds[roundNumberGlobal].length; i++) {
      if(tournament.rounds[roundNumberGlobal][i].testId == testIdGlobal) {
        console.log(tournament.rounds[roundNumberGlobal][i], 'tournament.rounds[roundNumberGlobal][i]') 
        if(tournament.rounds[roundNumberGlobal][i].answers) {
          tournament.rounds[roundNumberGlobal][i].responders.push(data.userId);
          tournament.rounds[roundNumberGlobal][i].answers[data.userId] = data.answers;
          break; 
        }  
        tournament.rounds[roundNumberGlobal][i].responders = [data.userId];
        tournament.rounds[roundNumberGlobal][i].answers = {
          [data.userId]: [...data.answers]
        }
        
      }
    } 

    let true_answers = false;   
    console.log(roundsGlobal[roundNumberGlobal][testIdGlobal], 'roundsGlobal[roundNumberGlobal][testIdGlobal]');
    console.log(data.answers.length, 'data.answers.length')
    console.log(roundsGlobal[roundNumberGlobal][testIdGlobal].true_answers.length, 'roundsGlobal[roundNumberGlobal][testIdGlobal].true_answers.length')

    if(data.answers.length === roundsGlobal[roundNumberGlobal][testIdGlobal].true_answers.length){
      console.log('length')
      true_answers = true;
    }

    for(let i = 0; true_answers && i < data.answers.length; i++) {
      if(roundsGlobal[roundNumberGlobal][testIdGlobal].true_answers.indexOf(data.answers[i]) === -1) {
        true_answers = false;
      }
    }
 
    if(true_answers) { 
      if(data.userId in tournament.balls) {
        tournament.balls[data.userId] += roundsGlobal[roundNumberGlobal][testIdGlobal].complexity;
      } else {
        tournament.balls[data.userId] = roundsGlobal[roundNumberGlobal][testIdGlobal].complexity;
      }
    }
  
    replyGlobal[data.userId] = true_answers;
    await tournament.updateOne({rounds: tournament.rounds, balls: tournament.balls});
    

    io.emit('REPLY', {userId: data.userId, reply: replyGlobal}); 
  }); 

  socket.on('STOP_TEST', async (data) => {
    testStatusGlobal = 'FINISH';
 
    const tournament = await tournamentDao.findTournamentById(tournamentIdGlobal);
    let answers;
    for(let i = 0; i < tournament.rounds[roundNumberGlobal].length; i++) {
      if(tournament.rounds[roundNumberGlobal][i].testId == testIdGlobal) { 
        answers = {...tournament.rounds[roundNumberGlobal][i].answers}
        tournament.rounds[roundNumberGlobal][i].status = testStatusGlobal;
        break;
      }
    }
    await tournament.updateOne({rounds: tournament.rounds});


    io.emit('STOP_TEST', { 
      reply: replyGlobal,  
      answers
    })
  });
   
  socket.on('STOP_TOURNAMENT', async () => {
    const tournament = await tournamentDao.findTournamentById(tournamentIdGlobal);
    tournament.status = 'FINISH';
    //Пофиксить ленгз
    for(let i = 0; i < tournament.rounds[roundNumberGlobal].length; i++) {
      if(tournament.rounds[roundNumberGlobal][i].testId == testIdGlobal) { 
        tournament.rounds[roundNumberGlobal][i].status = 'FINISH';
        break;
      }
    }
    await tournament.updateOne({status: tournament.status, rounds: tournament.rounds});

    tournamentStatusGlobal = null;
    tournamentIdGlobal = null;
    nameGame = null;
    
    roundsGlobal = null;
    testIdGlobal = null;
    testStatusGlobal = null;
    roundNumberGlobal = null;
    
    playersResultGlobal.length = 0;
    playersConnectGlobal.length = 0;
    replyGlobal = {};

    socket.emit('STOP_TOURNAMENT', {balls: tournament.balls})
  })




  // socket.on('CREATE', async (data) => {
  //   const gameInfo = await gameDao.findGameById(data.message);
  //   const leadings = gameInfo.leadings;
  //   let leadingResult = false;
  //   console.log(data.userId)
  //   for(let i = 0; i < leadings.length; i++) {
  //     console.log(leadings[i])
  //     if(leadings[i] == data.userId) {
  //       console.log(1)
  //       leadingResult = true;
  //       break;
  //     }

  //   }
  //   console.log("leading",leadingResult);
  //   io.emit('CREATE', {resolution: leadingResult})
  // });


  // socket.on('CREATE_TOURNAMENT', async (data)=>{
  //   //обработка и запись в бд, достать всех игроков
  //   console.log(data)
  //   const id = mongoose.Types.ObjectId();
  //   console.log(id)
  //   const newTournament = new Tournament({
  //     gameId: data.message, 
  //     status: "CREATE",
  //     _id: id
  //   });

  //   const gameInfo = await gameDao.findGameById(data.message);
  //   const players = gameInfo.players;

  //   // const playersResult = players.map(async (item)=>{
  //   //   const userProfileInfo = await userDao.findUserById(item);
  //   //   return {login: userProfileInfo.login, id:userProfileInfo._id};
  //   // })
  //   const playersResult = [];
  //   for(let i = 0; i < players.length; i++) {
  //     const userProfileInfo = await userDao.findUserById(players[i]);
  //     playersResult.push({login: userProfileInfo.login, id:userProfileInfo._id});
  //   }

  //   console.log("players",playersResult);
  
  //   // const userProfileInfo = await userDao.findUserById(userId)
  //   // const userInfo = {login: userProfileInfo.login};

  //   await newTournament.save();
  //   console.log(players);
  //   io.emit('CREATE_TOURNAMENT', {players: playersResult, id:id})
  // })

  // socket.on('CONNECT_PLAYER', (data)=>{
  //   console.log(data)
  //   const [token] = data.token.split(' ');
  //   console.log(token)
  //   if (!token) {  
  //     return res.status(401).json({message: 'No JWT token found!'});
  //   }
  //   const user = jwt.verify(token, JWT_SECRET);
  //   console.log(user)
  //   // if (!token) {
  //   //   return res.status(401).json({message: 'No JWT token found!'});
  //   // }
  //   // user = jwt.verify(token, JWT_SECRET);
  //   // console.log(user)
  //   console.log('CONNECT_PLAYER')
  //   io.emit('CONNECT_PLAYER', user)
  // });

  // socket.on('START_TOURNAMENT', async (data)=>{
  //   await tournamentDao.findTournamentAndUpdateById(data.idTournament, "status", "START");
  //   const gameInfo = await gameDao.findGameById(data.gameId);
  //   const rounds = gameInfo.rounds; 
  //   socket.emit('ROUNDS', rounds)
  // })

  // socket.on('NEW_CHAT_MESSAGE', (data)=>{
  //   io.emit('PUSH_CHAT_MESSAGE', data);
  // })
})

const start = async () => {
  await mongoose.connect('mongodb+srv://snezhka_18:snezhka@cluster0.kpnu9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  // app.listen(PORT);
  http.listen(PORT, ()=>{
    console.log(`Server works at port ${PORT}`);
  })
};

start();


