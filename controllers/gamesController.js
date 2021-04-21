const { Game } = require('../models/gameModel');
const gameDao = require('../dao/gameDao');
const userDao = require('../dao/userDao');
const { Tournament } = require('../models/tournamentModel');

module.exports.newGame = async (req, res) => {
  const { nameGame, rounds, leadings, players, type } = req.body;
  await gameDao.findGameByName(nameGame);

  for(let i = 0; i < leadings.length; i++) {
    let userProfileInfo = await userDao.findUserById(leadings[i]);
    if(userProfileInfo.role === "STUDENT") {
      return res.status(400).json({message: `User ${userProfileInfo.login} is not leading!`});
    }
  }

  if(type === "PLAYER") {
    for(let i = 0; i < leadings.length; i++) {
      await userDao.findUserById(players[i]);
    }
  }

  const newGame = new Game({
    nameGame,
    leadings, 
    players, 
    type,
    rounds
  });

  await newGame.save();
  res.json({message: "Game created successfully!"});
};


module.exports.getGamesInfo = async (req, res) => {
  const gamesInfo = await gameDao.findGames();
  res.json(gamesInfo); 
}

module.exports.getGameInfo = async (req, res) => {
  const gameInfo = await gameDao.findGameById(req.params.gameId);
  res.json({game: gameInfo});
}

module.exports.getRoundInfo = async (req, res) => {
  const gameInfo = await gameDao.findGameById(req.params.gameId);
  const round = req.params.round;

  if(!gameInfo.rounds[round]) {
    return res.status(400).json({message: 'No round found'});
  }
  

  // if(!gameInfo.rounds[round] || gameInfo.rounds[round].length === 0) {
  //   return res.status(400).json({message: 'No round found'});
  // }

  res.json({round: gameInfo.rounds[round]});
}

module.exports.changeLeadings = async (req, res) => {
  const game = await gameDao.findGameById(req.params.gameId);
  const { leadings } = req.body;
  for(let i = 0; i < leadings.length; i++) {
    let userProfileInfo = await userDao.findUserById(leadings[i]);
    if(userProfileInfo.role === "STUDENT") {
      return res.status(400).json({message: `User ${userProfileInfo.login} is not leading!`});
    }
  }
  await game.updateOne({leadings : leadings});
  res.json({message: 'Leadings changed successfully!'});
};

module.exports.addLeadings = async (req, res) => {
  const game = await gameDao.findGameById(req.params.gameId);
  const { leadings } = req.body;
  for(let i = 0; i < leadings.length; i++) {
    let userProfileInfo = await userDao.findUserById(leadings[i]);
    if(userProfileInfo.role === "STUDENT") {
      return res.status(400).json({message: `User ${userProfileInfo.login} is not leading!`});
    }
  }
  game.leadings.concat(leadings);
  await game.updateOne({leadings : game.leadings.concat(leadings)});
  res.json({message: 'Leadings added successfully!'});
};

module.exports.changePlayers = async (req, res) => {
  const game = await gameDao.findGameById(req.params.gameId);
  const { players } = req.body;
  if(game.type === "PLAYER") {
    for(let i = 0; i < players.length; i++) {
      await userDao.findUserById(players[i]);
    }
  }
  await game.updateOne({players : players});
  res.json({message: 'Players changed successfully!'});
};

module.exports.addPlayers = async (req, res) => {
  const game = await gameDao.findGameById(req.params.gameId);
  const { players } = req.body;
  if(game.type === "PLAYER") {
    for(let i = 0; i < players.length; i++) {
      await userDao.findUserById(players[i]);
    }
  }

  await game.updateOne({players : game.players.concat(players)});
  res.json({message: 'Players added successfully!'});
};


module.exports.changeRound = async (req, res) => {
  const game = await gameDao.findGameById(req.params.gameId);
  const round = req.params.round;
  const { tests } = req.body;

  if(!game.rounds[round] || game.rounds[round].length === 0) {
    game.rounds.push(tests);
  } else {
    game.rounds[round] = tests;
  }

  await game.updateOne({rounds : game.rounds});
  res.json({message: 'Round changed successfully!'});
}

module.exports.changeNameGame = async (req, res) => {
  const game = await gameDao.findGameById(req.params.gameId);
  const { nameGame } = req.body;

  await gameDao.findGameByName(nameGame);
  await game.updateOne({nameGame : nameGame});

  res.json({message: 'Name game changed successfully!'});
};

module.exports.changeRounds = async (req, res) => {
  const game = await gameDao.findGameById(req.params.gameId);
  const { rounds } = req.body;

  await game.updateOne({rounds : rounds});
  res.json({message: 'Rounds changed successfully!'});
};

module.exports.deleteLeadingWithGame = async (req, res) => {
  const game = await gameDao.findGameById(req.params.gameId);
  const leading = req.params.leadingId;
  const position = game.leadings.indexOf(leading);
  if(position !== -1) {
    game.leadings.splice(position, 1);
    if(game.leadings.length === 0) {
      await game.deleteOne();
      return res.json({message: 'Game deleted successfully!'});
    }
    await game.updateOne({leadings : game.leadings});
    return res.json({message: `Leading deleted with game!`});  
  }

  return res.status(400).json({message: `Leading did not found`});
};

module.exports.deletePlayerWithGame = async (req, res) => {
  const game = await gameDao.findGameById(req.params.gameId);
  const player = req.params.playerId;
  const position = game.players.indexOf(player);
  if(position !== -1) {
    game.players.splice(position, 1);
    if(game.players.length === 0) {
      await game.deleteOne();
      return res.json({message: 'Game deleted successfully!'});
    }
    await game.updateOne({players : game.players});
    return res.json({message: `Player deleted with game!`});  
  }

  return res.status(400).json({message: `Player did not found`});
};

module.exports.deleteGame = async (req, res) => {
  const gameId = req.params.gameId
  const game = await gameDao.findGameById(gameId);
  const tournaments = await Tournament.find({})
    .catch(err => console.log(err));
  
  if(tournaments) {
    for(let i = 0; i < tournaments.length; i++) {
      if(tournaments[i].gameId === gameId) {
        await tournaments[i].deleteOne();
        tournaments.splice(i, 1);
        i--;
      }
    } 
  }

  await game.deleteOne();
  res.json({message: 'Game deleted successfully!'});
};

module.exports.deleteRound = async (req, res) => {
  const game = await gameDao.findGameById(req.params.gameId);
  const round = req.params.round;

  if(!game.rounds[round] || game.rounds[round].length === 0) {
    return res.status(400).json({message: 'No round found'});
  } 

  game.rounds.splice(round, 1);

  if(game.rounds.length === 0) {
    await game.deleteOne();
    res.json({message: 'Game deleted successfully!'});
  } else {
    await game.updateOne({rounds : game.rounds});
    res.json({message: 'Round deleted successfully!'});
  } 
};

module.exports.deleteTestWithGame = async (req, res) => {
  const game = await gameDao.findGameById(req.params.gameId);
  const round = req.params.round;
  const testId = req.params.testId;
  const roundsWithGame = game.rounds;

  if(!roundsWithGame || roundsWithGame.length === 0) {
    return res.status(400).json({message: 'No round found'});
  } 

  const index = roundsWithGame[round].indexOf(testId);

  if(index === -1) {
    return res.status(400).json({message: 'No test found with round'});
  }

  roundsWithGame[round].splice(index, 1);

  if(roundsWithGame[round].length === 0) {
    this.deleteRound(req, res);
  } else {
    await game.updateOne({rounds : roundsWithGame});
    res.json({message: 'Test deleted successfully with round!'});
  } 
};