const { Game } = require('../models/gameModel');
const { Tournament } = require('../models/tournamentModel');

module.exports.newTournament = async (req, res) => {
  const { gameId, leadings, players, type } = req.body;

  const newTournament = new Tournament({
    gameId, 
    leadings, 
    players, 
    type 
  });

  await newTournament.save();
  res.json({message: 'Tournament created successfully!'});

};

module.exports.addTestToRound = async (req, res) => {
  const tournamentId = req.params.tournamentId;
  const round = req.params.round;
  const testId = req.params.testId;
  const { status } = req.body;

  const tournament = await Tournament.findById(tournamentId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournament) {
    return res.status(400).json({message: 'No tournament found'});
  }

  tournament.rounds[round].push({
    testId,
    status
  });

  tournament.updateOne({rounds: tournament.rounds});

  res.json({message: 'Test start!'});
};

module.exports.addAnswer = async (req, res) => {
  const tournamentId = req.params.tournamentId;
  const round = req.params.round;
  const testId = req.params.testId;
  const { player, answer } = req.body;

  const tournament = await Tournament.findById(tournamentId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournament) {
    return res.status(400).json({message: 'No tournament found'});
  }
  
  for(let i = 0; i < tournament.rounds[round].length; i++) {
    if(tournament.rounds[round][i].testId === testId) {
      tournament.rounds[round][i].responders.push(player);
      tournament.rounds[round][i].answers[player] = answer;
      break;
    }
  }

  tournament.updateOne({rounds: tournament.rounds});
  res.json({message: `Player ${player} answered ${answer}`});

};

module.exports.changeStatusTest = async (res, req) => {
  const tournamentId = req.params.tournamentId;
  const round = req.params.round;
  const testId = req.params.testId;
  const { status } = req.body;

  const tournament = await Tournament.findById(tournamentId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournament) {
    return res.status(400).json({message: 'No tournament found'});
  }

  for(let i = 0; i < tournament.rounds[round].length; i++) {
    if(tournament.rounds[round][i].testId === testId) {
      tournament.rounds[round][i].status = status;
      break;
    }
  }

  tournament.updateOne({rounds: tournament.rounds});
  res.json({message: `Status test update`});
};

module.exports.getTestResult = async (res, reg) => {
  const tournamentId = req.params.tournamentId;
  const round = req.params.round;
  const testId = req.params.testId;

  const tournament = await Tournament.findById(tournamentId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournament) {
    return res.status(400).json({message: 'No tournament found'});
  }

  const tour = tournament.rounds[round];

  for(let i = 0; i < tour.length; i++) {
    if(tour[i].testId === testId) {
      res.json({test: tour[i]});
      break;
    }
  }

};

module.exports.changeStatusTournament = async (req, res) => {
  const tournamentId = req.params.tournamentId;
  const { status } = req.body;

  const tournament = await Tournament.findByIdAndUpdate(tournamentId, {status: status})
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournament) {
    return res.status(400).json({message: 'No tournament found'});
  }

  res.json({message: `Status tournament update`});
};

module.exports.deleteTournament = async (req, res) => {
  const tournament = await Tournament.findById(req.params.tournamentId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournament) {
    return res.status(400).json({message: 'No tournament found'});
  }

  await tournament.deleteOne();
  res.json({message: 'Tournament deleted successfully!'});
};

module.exports.changeAnswer = async (req, res) => {
  const tournamentId = req.params.tournamentId;
  const round = req.params.round;
  const testId = req.params.testId;
  const { player, answer } = req.body;

  const tournament = await Tournament.findById(tournamentId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournament) {
    return res.status(400).json({message: 'No tournament found'});
  }
  
  for(let i = 0; i < tournament.rounds[round].length; i++) {
    if(tournament.rounds[round][i].testId === testId) {
      tournament.rounds[round][i].answers[player] = answer;
      break;
    }
  }

  tournament.updateOne({rounds: tournament.rounds});
  res.json({message: `Player ${player} is answer has been changed`});

};

module.exports.getTournamentInfo = async (req, res) => {
  const tournamentId = req.params.tournamentId;
  const tournamentInfo = await Tournament.findById(tournamentId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournamentInfo) {
    return res.status(400).json({message: 'No tournament found'});
  }

  res.json({tournament: tournamentInfo});
};

module.exports.getTournamentsInfo = async (req, res) => {
  const tournamentsInfo = await Tournament.find({})
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournamentsInfo  || tournamentsInfo.length === 0) {
    return res.status(400).json({message: 'No tournaments found'});
  }

  res.json(tournamentsInfo); 
};

module.exports.getGame = async (req, res) => {
  const tournamentId = req.params.tournamentId;
  const tournament = await Tournament.findById(tournamentId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournament) {
    return res.status(400).json({message: 'No tournament found'});
  }

  const game = await Game.findById(tournament.gameId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!game) {
    return res.status(400).json({message: 'No game found'});
  }

  res.json(game); 
};

module.exports.getRound = async (req, res) => {
  const tournamentId = req.params.tournamentId;
  const round = req.params.round;
  const tournament = await Tournament.findById(tournamentId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournament) {
    return res.status(400).json({message: 'No tournament found'});
  }

  const game = await Game.findById(tournament.gameId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!game) {
    return res.status(400).json({message: 'No game found'});
  }

  res.json(game.rounds[round]); 
};

