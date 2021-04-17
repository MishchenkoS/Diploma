const express = require('express');

const { asyncWrapper } = require('../helpers');
const { authMiddleware, adminRoleChecker } = require('./middlewares/authMiddleware');
const { idValidation, gameValidation, roundValidation, nameGameValidation, testValidation } = require('./middlewares/validationMiddleware');
const { getGamesInfo, newGame, getGameInfo, getRoundInfo, changeRound, changeNameGame, changeRounds, deleteGame, deleteRound, deleteTestWithGame } = 
  require('../controllers/gamesController');
const { getTestInfo, changeTest } = require('../controllers/testsController');


const router = new express.Router();

router.get('/', authMiddleware, 
    asyncWrapper(adminRoleChecker), getGamesInfo);
router.get('/game/:gameId',asyncWrapper(idValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), getGameInfo);
router.get('/game/:gameId/:round', asyncWrapper(idValidation),authMiddleware, 
    asyncWrapper(adminRoleChecker), getRoundInfo);
router.get('/game/:gameId/:round/:testId', asyncWrapper(idValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), getTestInfo);

router.post('/game', authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(gameValidation), newGame);

router.patch('/game/:gameId/:round', asyncWrapper(idValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(roundValidation), changeRound);
router.patch('/game/:gameId/:round/:testId', asyncWrapper(idValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(testValidation), changeTest);  
router.patch('/name/:gameId', asyncWrapper(idValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(nameGameValidation), changeNameGame);
router.patch('/rounds/:gameId', asyncWrapper(idValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), changeRounds);

router.delete('/game/:gameId', asyncWrapper(idValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), deleteGame);
router.delete('/game/:gameId/:round', asyncWrapper(idValidation), authMiddleware, 
  asyncWrapper(adminRoleChecker), deleteRound);
router.delete('/game/:gameId/:round/:testId', asyncWrapper(idValidation), authMiddleware, 
  asyncWrapper(adminRoleChecker), deleteTestWithGame);

module.exports = router;

