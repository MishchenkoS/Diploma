const { array } = require('joi');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

module.exports.registrationValidation = async (req, res, next) => {
  console.log("reg");
  const schema = joi.object({
    login: joi.string().required(),
    password: joi.string().required(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    group: joi.string(),
    team: joi.string(),
    role: joi.string().pattern(new RegExp('^(STUDENT|LEADING|ADMIN)$')),
    created_date: joi.string(),
    _id : joi.string(),
    __v: joi.number()
  });

  console.log(req.body)

  await schema.validateAsync(req.body);
  console.log(req.body)
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
    oldPassword: joi.string().required(),
    newPassword: joi.string().required(),
  });

  await schema.validateAsync(req.body);
  next();
};

module.exports.roleChangingValidation = async (req, res, next) => {
  const schema = joi.object({
    newRole: joi.string().required(),
  });

  await schema.validateAsync(req.body);
  next();
};

module.exports.tournamentValidation = async (req, res, next) => {
  const schema = joi.object({
    gameId: joi.objectId().required()
  });
  await schema.validateAsync(req.body);
  next();
};

module.exports.answerValidation = async (req, res, next) => {
  const schema = joi.object({
    player: joi.objectId().required(),
    answer: joi.string().required()
  });
  await schema.validateAsync(req.body);
  next();
}

module.exports.testValidation = async (req, res, next) => {
  console.log("testValidation",req.body)
  const schema = joi.object({
    complexity: joi.number().required(), 
    type: joi.string().pattern(new RegExp('^(RADIO|CHECK|WRITE)$')).required(), 
    question: joi.string().required(), 
    img_question: joi.string(), 
    answers: joi.array().items(joi.string()).required(), 
    img_answers: joi.array().items(joi.string()), 
    true_answers: joi.array().items(joi.string()).required(),
    created_date: joi.string(),
    _id : joi.string(),
    __v: joi.number()
  });

  const result = await schema.validateAsync(req.body);
  console.log(result)
  next();
};

module.exports.gameValidation = async (req, res, next) => {
  let players = joi.objectId();
  if(req.body.type === "Team") {
    players = joi.string();
  }

  const schema = joi.object({
    nameGame: joi.string().required(),
    leadings: joi.array().items(joi.objectId()).required(),
    players: joi.array().items(players).required(),
    type: joi.string().pattern(new RegExp('^(TEAM|PLAYER)$')).required(),
    rounds: joi.array().items(joi.object().pattern(joi.objectId(), joi.objectId())).required(),
    created_date: joi.string(),
    _id : joi.string(),
    __v: joi.number()
  });

  await schema.validateAsync(req.body);
  next();
};

module.exports.leadingsChangingValidation = async (req, res, next) => {
  const schema = joi.object({
    leadings: joi.array().items(joi.objectId()).required(),
  });

  await schema.validateAsync(req.body);
  next();
};

module.exports.roundValidation = async (req, res, next) => {
  const schema = joi.object({
    tests: joi.object().pattern(joi.objectId(), joi.objectId())
  });
  await schema.validateAsync(req.body);
  next();
};

module.exports.roundsValidation = async (req, res, next) => {
  const schema = joi.object({
    rounds: joi.array().items(joi.object().pattern(joi.objectId(), joi.objectId())).required()
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


module.exports.idGameValidation = async (req, res, next) => {
  console.log("idGameValidation")
  const schema = joi.object({
    testId: joi.objectId(),
    gameId: joi.objectId(),
    round: joi.number(),
    playerId: joi.objectId(),
    leadingId: joi.objectId()
  });

  await schema.validateAsync(req.params);
  next();
};

module.exports.idUserValidation = async (req, res, next) => {
  const schema = joi.object({
    userId: joi.objectId(),
  });

  await schema.validateAsync(req.params);
  next();
}