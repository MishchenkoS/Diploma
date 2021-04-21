const express = require('express');

const {authMiddleware, adminRoleChecker} = require('./middlewares/authMiddleware');
const {getUserProfileInfo, deleteUserProfile, changeUserPassword, changeUserRole, getUsersProfileInfo} =
    require('../controllers/usersController');
const {asyncWrapper} = require('../helpers');
const {idUserValidation, paswordChangingValidation, roleChangingValidation} =
    require('./middlewares/validationMiddleware');

const router = new express.Router();


router.get('/', authMiddleware, asyncWrapper(getUserProfileInfo));
router.get('/admin', authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(getUsersProfileInfo));
router.get('/admin/:userId', authMiddleware, asyncWrapper(adminRoleChecker),
    asyncWrapper(idUserValidation), asyncWrapper(getUserProfileInfo));
router.patch('/admin/password/:userId', authMiddleware, asyncWrapper(adminRoleChecker), 
    asyncWrapper(idUserValidation), asyncWrapper(paswordChangingValidation), asyncWrapper(changeUserPassword));
router.patch('/admin/role/:userId', authMiddleware, asyncWrapper(adminRoleChecker), 
    asyncWrapper(idUserValidation), asyncWrapper(roleChangingValidation), asyncWrapper(changeUserRole));
router.delete('/admin/profile/:userId', authMiddleware, asyncWrapper(adminRoleChecker), 
    asyncWrapper(idUserValidation), asyncWrapper(deleteUserProfile));

module.exports = router;
