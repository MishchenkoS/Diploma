const express = require('express');

const {authMiddleware, adminRoleChecker} = require('./middlewares/authMiddleware');
const {getUserProfileInfo, deleteUserProfile, changeUserPassword, changeUserRole, getUsersProfileInfo} =
    require('../controllers/usersController');
const {asyncWrapper} = require('../helpers');
const {paswordChangingValidation, roleChangingValidation} =
    require('./middlewares/validationMiddleware');

const router = new express.Router();


router.get('/', authMiddleware, getUserProfileInfo);
router.get('/admin', authMiddleware, 
    asyncWrapper(adminRoleChecker), getUsersProfileInfo);
router.patch('/admin/password', authMiddleware,
    asyncWrapper(adminRoleChecker), asyncWrapper(paswordChangingValidation), changeUserPassword);
router.patch('/admin/role', authMiddleware,
    asyncWrapper(adminRoleChecker), asyncWrapper(roleChangingValidation), changeUserRole);
router.delete('/admin/profile', authMiddleware, 
    asyncWrapper(adminRoleChecker), deleteUserProfile);
module.exports = router;
