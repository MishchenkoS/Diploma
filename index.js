require('dotenv').config(); //Загрузка переменных из среды .env

const mongoose = require('mongoose'); 
const express = require('express');
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

const playersResultGlobal = [];
const playersConnectGlobal = [];
let tournamentStatusGlobal;
let tournamentIdGlobal;
let roundsGlobal;
let testIdGlobal;
let testStatusGlobal;
let roundNumberGlobal;


io.on('connection', (socket) =>{
  console.log('New user connected');


  socket.on('CONNECT', async (data) => {
    const gameInfo = await gameDao.findGameById(data.gameId);
    const leadings = gameInfo.leadings;
    const players = gameInfo.players;
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
      socket.emit("CONNECT", {roleGame: role});

    } else if(tournamentStatusGlobal === 'CREATE') {

      socket.emit('CONNECT', {
        roleGame: role,
        playersConnect: playersConnectGlobal, 
        players: playersResultGlobal, 
        status: tournamentStatusGlobal,
        id: tournamentIdGlobal,
      });

      if(role === 'PLAYER') {
        socket.emit("CONNECT_PLAYER", {
          userId: data.userId, 
        });
      }
    } else if(tournamentStatusGlobal === 'START') {
      socket.emit('CONNECT', {
        roleGame: role,
        players: playersResultGlobal, 
        status: tournamentStatusGlobal,
        rounds: roundsGlobal,
        id: tournamentIdGlobal,
        test: roundsGlobal && testIdGlobal && roundsGlobal[roundNumberGlobal][testIdGlobal],
        statusTest: testStatusGlobal
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
    io.emit('CREATE', {players: playersResultGlobal, id:id, status: tournamentStatusGlobal})
  })

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

    // console.log(rounds, 163)
    tournamentStatusGlobal = 'START';
    
    socket.emit('START', {rounds: rounds, status: tournamentStatusGlobal});
  })


  socket.on('START_TEST', async (data) => {
    roundNumberGlobal = data.round;
    testIdGlobal = data.id;
    testStatusGlobal = 'START';
    socket.emit('START_TEST', {test: roundsGlobal[data.round][data.id]});
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


