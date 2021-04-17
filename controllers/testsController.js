const { Test } = require('../models/testModel');
const { Game } = require('../models/gameModel');
// const { deleteTestWithGame } = require('./gamesController');

//Создаем новый тест

module.exports.newTest = async (req, res) => {
  const { complexity, type, question, img_question, answers, img_answers, true_answer } = req.body;

  const newTest = new Test({
    complexity, 
    type, 
    question, 
    img_question, 
    answers, 
    img_answers, 
    true_answer
  });

  await newTest.save();
  res.json({message: 'Test created successfully!'});
};


module.exports.getTestsInfo = async (req, res) => {
  const testsInfo = await Test.find({})
    .catch((err) => {
      console.error(err.message);
    });

  if (!testsInfo || testsInfo.length === 0) {
    return res.status(400).json({message: 'No tests found'});
  }

  res.json(testsInfo); 
};

module.exports.getTestInfo = async (req, res) => {
  const testInfo = await Test.findById(req.params.testId)
    .catch((err) => {
      console.error(err.message);
    });
  
  if (!testInfo) {
    return res.status(400).json({message: 'No test found'});
  }
  
  res.json({test: testInfo});
};


module.exports.changeTest = async (req, res) => {
  const testId  = req.params.testId;
  const { complexity, type, question, img_question, answers, img_answers, true_answer } = req.body;

  const test = await Test.findById(testId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!test) {
    return res.status(400).json({message: 'No test found'});
  }

  await test.updateOne({
    complexity, 
    type, 
    question, 
    img_question, 
    answers, 
    img_answers, 
    true_answer
  });

  res.json({message: 'Test changed successfully!'});
};


module.exports.deleteTest = async (req, res) => {
  const testId = req.params.testId;
  const test = await Test.findById(testId)
    .catch((err) => {
      console.error(err.message);
    });

  if (!test) {
    return res.status(400).json({message: 'No test found'});
  } 

  const games = await Game.find({})
    .catch((err) => {
      console.error(err.message);
    });

  let exit = true;

  if(games) {
    for(let i = 0; i < games.length; i++) {
      exit = true;
      for(let j = 0; exit && j < games[i].rounds.length ; j++) {
        for(let k = 0; exit && k < games[i].rounds[j].length; k++) {
          if(games[i].rounds[j][k] === testId) {
            games[i].rounds[j].splice(k, 1);
            if(games[i].rounds[j].length === 0) {
              games[i].rounds.splice(j, 1);
              if(games[i].rounds.length === 0){
                await games[i].deleteOne();
                games.splice(i, 1);
                i--;
                exit = false;
              } else {
                await games[i].updateOne({rounds : games[i].rounds});
                j--;
                break;
              }
            } else{
              await games[i].updateOne({rounds : games[i].rounds});
              k--;
            }
          }
        }
      }
    }
  }

  // console.log(games)
  // if(games) {
  //   games.forEach((item1, index1) => {
  //     console.log("item1");
  //     console.log(item1);
  //     item1.rounds.forEach((item2, index2) => {
  //       console.log("item2");
  //       console.log(item2);
  //           const index = item2.indexOf(testId);
  //           if(index !== -1) {
  //             let result = item2.splice(index, 1);
  //             console.log(result);
  //             await Game.findByIdAndUpdate(item1._id);
  //           }
  //     });
  //   });
  // }
  // console.log(games)
  // await Game.updateOne(games);
  await test.deleteOne();
  res.json({message: 'Test deleted successfully!'});
};

