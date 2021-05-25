const express = require('express');

const { asyncWrapper } = require('../helpers');
const { authMiddleware, adminRoleChecker } = require('./middlewares/authMiddleware');
const { idGameValidation, gameValidation, roundValidation, nameGameValidation, testValidation, 
  leadingsChangingValidation, roundsValidation } = require('./middlewares/validationMiddleware');
const { getGamesInfo, getGameInfo, getRoundInfo, 
  addLeadings, addPlayers, newGame,
  changeRound, changeNameGame, changeRounds, changeGame, changeLeadings,changePlayers,
  deleteGame, deleteRound, deleteTestWithGame, deleteLeadingWithGame, deletePlayerWithGame } = 
  require('../controllers/gamesController');
const { getTestInfo, changeTest } = require('../controllers/testsController');


const router = new express.Router();

router.get('/', authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(getGamesInfo));
router.get('/game/:gameId',asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), getGameInfo);
router.get('/game/:gameId/:round', asyncWrapper(idGameValidation),authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(getRoundInfo));
router.get('/game/:gameId/:round/:testId', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(getTestInfo));

router.post('/game', authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(gameValidation), asyncWrapper(newGame));

router.patch('/changeGame/:gameId', asyncWrapper(idGameValidation), authMiddleware, 
  asyncWrapper(adminRoleChecker), asyncWrapper(gameValidation), asyncWrapper(changeGame))




router.patch('/game/:gameId/:round', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(roundValidation), asyncWrapper(changeRound));
router.patch('/game/:gameId/:round/:testId', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(testValidation), asyncWrapper(changeTest));  
router.patch('/name/:gameId', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(nameGameValidation), asyncWrapper(changeNameGame));
router.patch('/rounds/:gameId', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(roundsValidation), asyncWrapper(changeRounds));
router.patch('/leadings/:gameId', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(leadingsChangingValidation), asyncWrapper(changeLeadings));
router.patch('/leadingsAdd/:gameId', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(leadingsChangingValidation), asyncWrapper(addLeadings));
router.patch('/players/:gameId', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker),  asyncWrapper(changePlayers));
router.patch('/playersAdd/:gameId', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(addPlayers));


router.delete('/game/:gameId', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(deleteGame));
router.delete('/game/:gameId/:round', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(deleteRound));
router.delete('/game/:gameId/:round/:testId', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(deleteTestWithGame));
router.delete('/leading/:gameId/:leadingId', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(deleteLeadingWithGame));
router.delete('/player/:gameId/:playerId', asyncWrapper(idGameValidation), authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(deletePlayerWithGame));

module.exports = router;

