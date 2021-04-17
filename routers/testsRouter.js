const express = require('express');

const { authMiddleware, adminRoleChecker } = require('./middlewares/authMiddleware');
const { testValidation, idValidation } = require('./middlewares/validationMiddleware');
const { newTest, getTestsInfo, changeTest, deleteTest, getTestInfo } =
    require('../controllers/testsController');
const { asyncWrapper } = require('../helpers');

const router = new express.Router();

//Добавить валидацию

router.get('/', authMiddleware, 
    asyncWrapper(adminRoleChecker), getTestsInfo);
router.get('/:testId', authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(idValidation), getTestInfo);
router.post('/test', authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(testValidation), newTest);
router.patch('/:testId', authMiddleware, asyncWrapper(adminRoleChecker), 
    asyncWrapper(idValidation), asyncWrapper(testValidation), changeTest);
router.delete('/:testId', authMiddleware,
    asyncWrapper(adminRoleChecker), asyncWrapper(idValidation), deleteTest);

module.exports = router;
