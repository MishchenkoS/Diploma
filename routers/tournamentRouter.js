const express = require('express');
const { getTestInfo } = require('../controllers/testsController');
const { getTournamentsInfo, newTournament, getTournamentInfo, getTestResult, addAnswer, addTestToRound, changeStatusTest, changeStatusTournament, getGame, getRound } = require('../controllers/tournamentController');

const router = new express.Router();

router

router.get('/', getTournamentsInfo);
router.post('/start', newTournament);

router.get('/:idTournament', getTournamentInfo);
router.get('/start/:idTournament', getGame);//вывод игры
router.get('/start/:idTournament/:round', getRound);
router.get('/start/:idTournament/:round/:idTest', getTestInfo);
router.get('/start/:idTournament/:round/:idTest/result', getTestResult);

router.post('/start/:idTournament/:round/:idTest/answer', addAnswer);
router.post('/start/:idTournament/:round/:idTest/test', addTestToRound);

router.patch('/start/:idTournament/:round/:idTest', changeStatusTest);
router.patch('/finish/:idTournament', changeStatusTournament);

module.exports = router;