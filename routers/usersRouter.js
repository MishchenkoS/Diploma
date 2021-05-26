const express = require('express');

const {authMiddleware, adminRoleChecker} = require('./middlewares/authMiddleware');
const {getUserProfileInfo, getUserInfo, deleteUserProfile, changeUserPassword, changeUserRole, getUsersProfileInfo, changeUser} =
    require('../controllers/usersController');
const {asyncWrapper} = require('../helpers');
const {idUserValidation, paswordChangingValidation, roleChangingValidation, registrationValidation} =
    require('./middlewares/validationMiddleware');

const router = new express.Router();


router.get('/', authMiddleware, asyncWrapper(getUserProfileInfo));
router.get('/admin', authMiddleware, 
    asyncWrapper(adminRoleChecker), asyncWrapper(getUsersProfileInfo));
router.get('/admin/:userId', authMiddleware, asyncWrapper(adminRoleChecker),
    asyncWrapper(idUserValidation), asyncWrapper(getUserProfileInfo));
router.get('/user/:userId', authMiddleware,
    asyncWrapper(idUserValidation), asyncWrapper(getUserInfo));

router.patch('/admin/changeUser/:userId', authMiddleware, asyncWrapper(adminRoleChecker), 
    asyncWrapper(idUserValidation),asyncWrapper(registrationValidation), asyncWrapper(changeUser));

router.patch('/admin/password/:userId', authMiddleware, asyncWrapper(adminRoleChecker), 
    asyncWrapper(idUserValidation), asyncWrapper(paswordChangingValidation), asyncWrapper(changeUserPassword));
router.patch('/admin/role/:userId', authMiddleware, asyncWrapper(adminRoleChecker), 
    asyncWrapper(idUserValidation), asyncWrapper(roleChangingValidation), asyncWrapper(changeUserRole));
router.delete('/admin/profile/:userId', authMiddleware, asyncWrapper(adminRoleChecker), 
    asyncWrapper(idUserValidation), asyncWrapper(deleteUserProfile));

module.exports = router;
