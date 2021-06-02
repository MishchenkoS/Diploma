const { Test } = require('../models/testModel');

module.exports.findTests = async () => {
  const test = await Test.find({})
    .catch((err) => {
      console.error(err.message);
    });

  if (!test || test.length === 0) {
    throw new Error('No tests found');
  }
  return test;
};

module.exports.findTestById = async (id) => {
  console.log(id)
  const test = await Test.findById(id)
    .catch((err) => {
      console.error(err.message);
    });
  
  if (!test) {
    throw new Error('No test found');
  }

  return test;
};