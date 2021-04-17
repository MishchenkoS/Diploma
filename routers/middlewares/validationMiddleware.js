const { array } = require('joi');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

module.exports.registrationValidation = async (req, res, next) => {
  const schema = joi.object({
    login: joi.string().required(),
    password: joi.string().required(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    group: joi.string(),
    team: joi.string(),
    role: joi.string().pattern(new RegExp('^(STUDENT|LEADING|ADMIN)$')).required(),
  });

  await schema.validateAsync(req.body);
  next();
};

module.exports.loginValidation = async (req, res, next) => {
  const schema = joi.object({
    login: joi.string().required(),
    password: joi.string().required(),
  });

  await schema.validateAsync(req.body);
  next();
};


module.exports.paswordChangingValidation = async (req, res, next) => {
  const schema = joi.object({
    userId: joi.string().required(),
    oldPassword: joi.string().required(),
    newPassword: joi.string().required(),
  });

  await schema.validateAsync(req.body);
  next();
};

module.exports.roleChangingValidation = async (req, res, next) => {
  const schema = joi.object({
    userId: joi.string().required(),
    newRole: joi.string().required(),
  });

  await schema.validateAsync(req.body);
  next();
};


module.exports.testValidation = async (req, res, next) => {
  const schema = joi.object({
    complexity: joi.number().required(), 
    type: joi.string().pattern(new RegExp('^(RADIO|CHECK|WRITE)$')).required(), 
    question: joi.string().required(), 
    img_question: joi.string(), 
    answers: joi.array().items(joi.string()).required(), 
    img_answers: joi.array().items(joi.string()), 
    true_answer: joi.array().items(joi.string()).required()
  });

  await schema.validateAsync(req.body);
  next();
};

module.exports.gameValidation = async (req, res, next) => {
  const schema = joi.object({
    nameGame: joi.string().required(),
    rounds: joi.array().items(joi.array().items(joi.objectId())).required()
  });

  await schema.validateAsync(req.body);
  next();
};

module.exports.roundValidation = async (req, res, next) => {
  const schema = joi.object({
    tests: joi.array().items(joi.objectId()).required()
  });
  await schema.validateAsync(req.body);
  next();
};

module.exports.roundsValidation = async (req, res, next) => {
  const schema = joi.object({
    rounds: joi.array().items(joi.array().items(joi.objectId())).required()
  });
  await schema.validateAsync(req.body);
  next();
};

module.exports.nameGameValidation = async (req, res, next) => {
  const schema = joi.object({
    nameGame: joi.string().required()
  });

  await schema.validateAsync(req.body);
  next();
};


module.exports.idValidation = async (req, res, next) => {
  const schema = joi.object({
    testId: joi.objectId(),
    gameId: joi.objectId(),
    round: joi.number()
  });

  await schema.validateAsync(req.params);
  next();
};
