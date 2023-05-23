require('dotenv').config(); //Загрузка переменных из среды .env

const mongoose = require('mongoose'); 
const express = require('express');
const morgan = require('morgan');

const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');
const testsRouter = require('./routers/testsRouter');
const gamesRouter = require('./routers/gamesRouter');
const tournamentsRouter = require('./routers/tournamentRouter');

const { Tournament } = require('./models/tournamentModel'); 
const tournamentDao = require('./dao/tournamentDao');
const gameDao = require('./dao/gameDao');
const userDao = require('./dao/userDao');
const testDao = require('./dao/testDao');

const PORT = process.env.PORT || 8080;   
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.json());
app.use(express.static('build'))
app.use(morgan('tiny'));

app.use('/api/auth', authRouter);
app.use('/api/users/me', usersRouter);
app.use('/api/tests', testsRouter);
app.use('/api/games', gamesRouter);
app.use('/api/tournaments', tournamentsRouter);
app.use((err, req, res, next) => res.status(500).json({message: err.message}));

let tournamentStatusGlobal;
let tournamentIdGlobal;
let nameGame;
let gameIdGlobal;
let gameTypeGlobal;

let roundsGlobal;
let testIdGlobal;
let testStatusGlobal;
let roundNumberGlobal;

const playersResultGlobal = [];
const playersConnectGlobal = [];
let replyGlobal = {};


io.on('connection', (socket) =>{

  socket.on('CONNECT', async (data) => {

    console.log(gameIdGlobal);

    if(!data.gameId && !gameIdGlobal) {
        io.emit('CONNECT', {message: "Нет начатых игр"});
    }

    const gameInfo = gameIdGlobal ? 
      await gameDao.findGameById(gameIdGlobal) : 
      await gameDao.findGameById(data.gameId);

    if(!gameIdGlobal) {
      gameIdGlobal = data.gameId;
    }

    const leadings = gameInfo.leadings;
    const players = gameInfo.players;
    nameGame = gameInfo.nameGame;
    gameTypeGlobal = gameInfo.type;

    let role = "VIEWER";
    let team;

    if(leadings.indexOf(data.userId) !== -1) {
      role = "LEADING";
    } else if(gameTypeGlobal === 'PLAYER') {
      if(players.indexOf(data.userId) !== -1) {
        role = "PLAYER";
      } 
    } else if(gameTypeGlobal === 'TEAM') {
      if(data.userId) {
        const userProfileInfo = await userDao.findUserById(data.userId);
        team = userProfileInfo.team;
        if(players.indexOf(userProfileInfo.team) !== -1) {
          role = "PLAYER";
        }
      }
    }
    
    if(!playersResultGlobal.length) {
      if(gameTypeGlobal === 'PLAYER') {
        for(let i = 0; i < players.length; i++) {
          const userProfileInfo = await userDao.findUserById(players[i]);
          playersResultGlobal.push({login: userProfileInfo.login, id:userProfileInfo._id});
        }
      } else if(gameTypeGlobal === 'TEAM') {
        for(let i = 0; i < players.length; i++) {
          playersResultGlobal.push({login: players[i], id: players[i]});
        }
      }
    }      

    if(role==="PLAYER") {
      if(gameTypeGlobal === 'PLAYER') {
        playersConnectGlobal.push(data.userId);
      } else if(gameTypeGlobal === 'TEAM') {
        playersConnectGlobal.push(team);
      }
    }

    if(!tournamentStatusGlobal) {
      io.emit("CONNECT", {roleGame: role, nameGame});
    } else if(tournamentStatusGlobal === 'CREATE') {
      io.emit('CONNECT', {
        roleGame: role,
        playersConnect: playersConnectGlobal, 
        players: playersResultGlobal, 
        status: tournamentStatusGlobal,
        id: tournamentIdGlobal, 
        nameGame,
        team
      });

      if(role === 'PLAYER') {
        if(gameTypeGlobal === 'PLAYER') {
          io.emit("CONNECT_PLAYER", {  
            userId: data.userId, 
          });
        } else {
          io.emit("CONNECT_PLAYER", {  
            userId: team 
          });
        }

      } 
    } else if(tournamentStatusGlobal === 'START') { 
      io.emit('CONNECT', { 
        roleGame: role,
        players: playersResultGlobal, 
        status: tournamentStatusGlobal,
        rounds: roundsGlobal,
        id: tournamentIdGlobal,
        test: roundsGlobal && testIdGlobal && roundsGlobal[roundNumberGlobal][testIdGlobal],
        statusTest: testStatusGlobal,
        countRound: roundNumberGlobal,
        nameGame,
        replyGlobal,
        team
      });
    }
  });

  socket.on('CREATE', async (data) => {
    const id = mongoose.Types.ObjectId();
    const newTournament = new Tournament({ 
      gameId: data.gameId, 
      status: "CREATE",  
      balls: {},
      _id: id
    });
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
    console.log(data.gameId, gameIdGlobal)
    let gameInfo;
    if(!data.gameId) {
      console.log(1);
      gameInfo = await gameDao.findGameById(gameIdGlobal);
    } else {
      console.log(2);
      console.log(data.gameId)
      gameInfo = await gameDao.findGameById(data.gameId);
      console.log(gameInfo)
    }

    console.log("4343", data.tournamentId)
    await tournamentDao.findTournamentAndUpdateById(data.tournamentId, 'status', 'START');

    console.log(data.gameId, gameIdGlobal)
    const rounds = [];
    for(let i = 0; i < gameInfo.rounds.length; i++) {
      rounds.push({});
      for(let key in gameInfo.rounds[i]) {
        const test = await testDao.findTestById(key);
        rounds[i][key] = test;
      }
    }
    
    roundsGlobal = [...rounds];
    tournamentStatusGlobal = 'START';
    
    io.emit('START', {
      rounds: rounds, 
      status: tournamentStatusGlobal
    });
  });


  socket.on('START_TEST', async (data) => {
    replyGlobal = {};
    roundNumberGlobal = data.round;
    testIdGlobal = data.id; 
    testStatusGlobal = 'START';  
    const tournament = await tournamentDao.findTournamentById(tournamentIdGlobal);


    if(!tournament.rounds[roundNumberGlobal]) {
      for(let i = 0; i <= roundNumberGlobal; i++) {
        if(!tournament.rounds[i]) {
          tournament.rounds.push([]);
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
    for(let i = 0; i < tournament.rounds[roundNumberGlobal].length; i++) {
      if(tournament.rounds[roundNumberGlobal][i].testId == testIdGlobal) {
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

    if(data.answers.length === roundsGlobal[roundNumberGlobal][testIdGlobal].true_answers.length){
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
    
    if(tournament.rounds) {
      if(tournament.rounds[roundNumberGlobal])
      for(let i = 0; i < tournament.rounds[roundNumberGlobal].length; i++) {
        if(tournament.rounds[roundNumberGlobal][i].testId == testIdGlobal) { 
          tournament.rounds[roundNumberGlobal][i].status = 'FINISH';
          break;
        }
      }
    }

    await tournament.updateOne({status: tournament.status, rounds: tournament.rounds});

    tournamentStatusGlobal = null;
    tournamentIdGlobal = null;
    nameGame = null;
     
    gameIdGlobal = null;
    roundsGlobal = null;
    testIdGlobal = null;
    testStatusGlobal = null;
    roundNumberGlobal = null;
    
    playersResultGlobal.length = 0;
    playersConnectGlobal.length = 0;
    replyGlobal = {};

    socket.emit('STOP_TOURNAMENT', {balls: tournament.balls})
  });
});

const start = async () => {
  await mongoose.connect('mongodb+srv://snezhka_18:snezhka@cluster0.kpnu9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  http.listen(PORT, ()=>{
    console.log(`Server works at port ${PORT}`);
  })
};

start();


