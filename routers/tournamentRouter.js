const express = require('express');
const { getTestInfo } = require('../controllers/testsController');
const { asyncWrapper } = require('../helpers');
const { getTournamentsInfo, newTournament, getTournamentInfo, getTestResult, addAnswer, addTestToRound, 
  changeStatusTest, changeStatusTournament, getGame, getRound, deleteTournament, changeAnswer } = require('../controllers/tournamentController');
const { authMiddleware, leadingRoleChecker } = require('./middlewares/authMiddleware');
const { tournamentValidation, answerValidation } = require('./middlewares/validationMiddleware');

const router = new express.Router();


router.get('/', authMiddleware, asyncWrapper(leadingRoleChecker), asyncWrapper(getTournamentsInfo));

router.post('/start', authMiddleware, asyncWrapper(leadingRoleChecker), asyncWrapper(tournamentValidation), asyncWrapper(newTournament));

router.get('/info/:tournamentId', authMiddleware, asyncWrapper(leadingRoleChecker), asyncWrapper(getTournamentInfo));
router.get('/start/:tournamentId', authMiddleware, asyncWrapper(getGame));
router.get('/start/:tournamentId/:round', authMiddleware, asyncWrapper(leadingRoleChecker), asyncWrapper(getRound));
router.get('/start/:tournamentId/:round/:testId', authMiddleware, asyncWrapper(getTestInfo));
router.get('/start/:tournamentId/:round/:testId/result', authMiddleware, asyncWrapper(getTestResult));

router.post('/start/:tournamentId/:round/:testId/answer', authMiddleware, asyncWrapper(answerValidation), asyncWrapper(addAnswer));
router.post('/start/:tournamentId/:round/:testId/test', authMiddleware, asyncWrapper(addTestToRound));

router.patch('/start/:tournamentId/:round/:testId/changeAnswer', authMiddleware, asyncWrapper(changeAnswer));
router.patch('/start/:tournamentId/:round/:testId', authMiddleware, asyncWrapper(changeStatusTest));
router.patch('/finish/:tournamentId', authMiddleware, asyncWrapper(leadingRoleChecker), asyncWrapper(changeStatusTournament));

router.delete('/:tournamentId', authMiddleware, asyncWrapper(leadingRoleChecker), asyncWrapper(deleteTournament))

module.exports = router;