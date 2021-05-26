const { Game } = require('../models/gameModel');
const { Tournament } = require('../models/tournamentModel');
const tournamentDao = require('../dao/tournamentDao');
const gameDao = require('../dao/gameDao');

module.exports.newTournament = async (req, res) => {
  const { gameId } = req.body;

  const newTournament = new Tournament({
    gameId, 
  });

  await newTournament.save();
  res.json({message: 'Tournament created successfully!'});
};

module.exports.addTestToRound = async (req, res) => {
  const tournament = await tournamentDao.findTournamentById(req.params.tournamentId);
  const round = req.params.round;
  const testId = req.params.testId;
  const { status } = req.body;

  if(tournament.rounds[round]) {
    tournament.rounds[round].push({
      testId,
      status
    });
  } else {
    tournament.rounds.push({
      testId,
      status
    });
  }

  console.log(tournament.rounds)

  await tournament.updateOne({rounds: tournament.rounds});
  res.json({message: 'Test start!'});
};

module.exports.addAnswer = async (req, res) => {
  const tournament = await tournamentDao.findTournamentById(req.params.tournamentId);
  const round = req.params.round;
  const testId = req.params.testId;
  const { player, answer } = req.body;
  
  if(tournament.rounds[round]){
    for(let i = 0; i < tournament.rounds[round].length; i++) {
      if(tournament.rounds[round][i].testId == testId) {
        tournament.rounds[round][i].responders.push(player);
        tournament.rounds[round][i].answers[player] = answer;
        break;
      } else {
        tournament.rounds[round][i].testId = testId;
        tournament.rounds[round][i].responders.push(player);
        tournament.rounds[round][i].answers[player] = answer;
      }
    }
  } else {
    tournament.rounds.push({
      testId,
      responders: [player],
      answers: {
        [player]: answer
      }
    });
  }

  await tournament.updateOne({rounds: tournament.rounds});
  res.json({message: `Player ${player} answered ${answer}`});
};

module.exports.changeStatusTest = async (req, res) => {
  const tournament = await tournamentDao.findTournamentById(req.params.tournamentId);
  const round = req.params.round;
  const testId = req.params.testId;
  const { status } = req.body;

  for(let i = 0; i < tournament.rounds[round].length; i++) {
    if(tournament.rounds[round][i].testId === testId) {
      tournament.rounds[round][i].status = status;
      break;
    }
  }

  await tournament.updateOne({rounds: tournament.rounds});
  res.json({message: `Status test update`});
};

module.exports.getTestResult = async (req, res) => {
  const tournament = await tournamentDao.findTournamentById(req.params.tournamentId);
  const round = req.params.round;
  const testId = req.params.testId;
  const tour = tournament.rounds[round];

  if(!tour){
    return res.status(400).json({message: "No result test found"})
  }

  for(let i = 0; i < tour.length; i++) {
    if(tour[i].testId == testId) {
      return res.json({test: tour[i]});
    }
  }

  return res.status(400).json({message: "No result test found"})
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
  const tournament = await tournamentDao.findTournamentById(req.params.tournamentId);

  await tournament.deleteOne();
  res.json({message: 'Tournament deleted successfully!'});
};

module.exports.changeAnswer = async (req, res) => {
  const tournament = await tournamentDao.findTournamentById(req.params.tournamentId);
  const round = req.params.round;
  const testId = req.params.testId;
  const { player, answer } = req.body;

  for(let i = 0; i < tournament.rounds[round].length; i++) {
    if(tournament.rounds[round][i].testId === testId) {
      tournament.rounds[round][i].answers[player] = answer;
      break;
    }
  }

  await tournament.updateOne({rounds: tournament.rounds});
  res.json({message: `Player ${player} is answer has been changed`});
};

module.exports.getTournamentInfo = async (req, res) => {
  const tournamentInfo = await tournamentDao.findTournamentById(req.params.tournamentId); 
  res.json({tournament: tournamentInfo});
};

module.exports.getTournamentsInfo = async (req, res) => {
  const tournamentsInfo = await tournamentDao.findTournaments();
  res.json(tournamentsInfo); 
};

module.exports.getGame = async (req, res) => {
  const tournament = await tournamentDao.findTournamentById(req.params.tournamentId);
  const game = await gameDao.findGameById(tournament.gameId);

  res.json(game); 
};

module.exports.getRound = async (req, res) => {
  const tournament = await tournamentDao.findTournamentById(req.params.tournamentId);
  const game = await gameDao.findGameById(tournament.gameId);
  const round = req.params.round;

  res.json(game.rounds[round]); 
};

module.exports.getMyTournamentsInfo = async (req, res) => {
  const userId = req.user.id;
  const tournamentsInfo = await tournamentDao.findTournaments();
  const gamesInfo = []
  console.log(tournamentsInfo)

  for(let i = 0; i < tournamentsInfo.length; i++) {
    console.log(tournamentsInfo[i].gameId)
    const fetched = await gameDao.findGameById(tournamentsInfo[i].gameId);
        console.log(fetched);
    gamesInfo.push(fetched);
  }

  // tournamentsInfo.map(async (item)=>{
  //   const fetched = await gameDao.findGameByName(item.nameGame);
  //   console.log(fetched);
  //   gamesInfo.push(fetched);
  // });
  const myTournaments = [];
  let flag = true;

  console.log(gamesInfo)

  for(let i = 0; i < gamesInfo.length; i++) {
    for(let j = 0; j < gamesInfo[i].leadings.length; j++) {  
      if(gamesInfo[i].leadings[j] == userId){
        myTournaments.push(tournamentsInfo[i]);
        flag = false;
        break;
      }
    }
    for(let j = 0; flag && j < gamesInfo[i].players.length; j++) {
      if(gamesInfo[i].players[j] === userId) {
        myTournaments.push(tournamentsInfo[i]);
        break;
      }
    }
    flag = true;
  }

  res.json(myTournaments); 
}