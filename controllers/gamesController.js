const { Game } = require('../models/gameModel');

module.exports.newGame = async (req, res) => {
  const { nameGame, rounds} = req.body;
  const game = await Game.findOne({nameGame})
    .catch((err) => {
      console.error(err.message);
    });

  if (game) {
    return res.status(400).json({message: `Game ${nameGame} already exists`});
  }

  const newGame = new Game({
    nameGame,
    rounds
  });

  await newGame.save();
  res.json({message: "Game created successfully!"});
};


module.exports.getGamesInfo = async (req, res) => {
  const gamesInfo = await Game.find({})
    .catch((err) => {
      console.error(err.message);
    });

  if (!gamesInfo || gamesInfo.length === 0) {
    return res.status(400).json({message: 'No games found'});
  }

  res.json(gamesInfo); 
}

module.exports.getGameInfo = async (req, res) => {
  const gameInfo = await Game.findById(req.params.gameId)
    .catch((err) => {
      console.error(err.message);
    });
  
  if (!gameInfo) {
    return res.status(400).json({message: 'No game found'});
  }
  
  res.json({game: gameInfo});
}

module.exports.getRoundInfo = async (req, res) => {
  const gameInfo = await Game.findById(req.params.gameId)
    .catch((err) => {
      console.error(err.message);
    });
  
  if (!gameInfo) {
    return res.status(400).json({message: 'No game found'});
  }

  const round = req.params.round;

  if(!gameInfo.rounds[round] || gameInfo.rounds[round].length === 0) {
    return res.status(400).json({message: 'No round found'});
  }

  res.json({round: gameInfo.rounds[round]});
}


module.exports.changeRound = async (req, res) => {
  const game = await Game.findById(req.params.gameId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!game) {
    return res.status(400).json({message: 'No game found'});
  }

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
  const game = await Game.findById(req.params.gameId)
    .catch((err) => {
      console.error(err.message);
    });
  
  if (!game) {
    return res.status(400).json({message: 'No game found'});
  }

  const { nameGame } = req.body;
  const gameForName = await Game.findOne({nameGame})
    .catch((err) => {
      console.error(err.message);
    });

  if (gameForName) {
    return res.status(400).json({message: `Game ${nameGame} already exists`});
  }

  await game.updateOne({nameGame : nameGame});
  res.json({message: 'Name game changed successfully!'});
};

module.exports.changeRounds = async (req, res) => {
  const game = await Game.findById(req.params.gameId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!game) {
    return res.status(400).json({message: 'No game found'});
  }

  const { rounds } = req.body;
  await game.updateOne({rounds : rounds});
  res.json({message: 'Rounds changed successfully!'});
};


module.exports.deleteGame = async (req, res) => {
  const game = await Game.findById(req.params.gameId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!game) {
    return res.status(400).json({message: 'No game found'});
  }

  await game.deleteOne();
  res.json({message: 'Game deleted successfully!'});
};

module.exports.deleteRound = async (req, res) => {
  const game = await Game.findById(req.params.gameId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!game) {
    return res.status(400).json({message: 'No game found'});
  }

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
  const game = await Game.findById(req.params.gameId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!game) {
    return res.status(400).json({message: 'No game found'});
  }

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