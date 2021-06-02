const express = require('express');

const {asyncWrapper} = require('../helpers');
const {registrationValidation, loginValidation} =
    require('./middlewares/validationMiddleware');
const {registration, login} =
    require('../controllers/authController');

const router = new express.Router();


router.post('/register', asyncWrapper(registrationValidation),
    asyncWrapper(registration));
 
router.post('/login', asyncWrapper(loginValidation), asyncWrapper(login));


module.exports = router;
