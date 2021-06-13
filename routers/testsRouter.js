const express = require('express');

const { authMiddleware, adminRoleChecker } = require('./middlewares/authMiddleware');
const { testValidation, idGameValidation } = require('./middlewares/validationMiddleware');
const { newTest, getTestsInfo, changeTest, deleteTest, getTestInfo, photoAdd, getPhoto } =
    require('../controllers/testsController');
const { asyncWrapper } = require('../helpers');

const router = new express.Router();

//Добавить валидацию

router.get('/', authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(getTestsInfo));
router.get('/:testId', authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(idGameValidation), asyncWrapper(getTestInfo));

// router.get('/:testId', asyncWrapper(getPhoto));

router.post('/test', authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(testValidation), asyncWrapper(newTest));

router.post('/photo', asyncWrapper(photoAdd));

router.patch('/:testId', authMiddleware, asyncWrapper(adminRoleChecker), 
    asyncWrapper(idGameValidation), asyncWrapper(testValidation), asyncWrapper(changeTest));
router.delete('/:testId', authMiddleware,
    asyncWrapper(adminRoleChecker), asyncWrapper(idGameValidation), asyncWrapper(deleteTest));

module.exports = router;
