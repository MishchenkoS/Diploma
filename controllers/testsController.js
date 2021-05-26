const { Test } = require('../models/testModel');
const { Game } = require('../models/gameModel');
const testDao = require('../dao/testDao');
// const { deleteTestWithGame } = require('./gamesController');


module.exports.photoAdd = async (req, res) =>{
  const {photo} = req.body;
  console.log(photo);
  
}

//Создаем новый тест

module.exports.newTest = async (req, res) => {
  const { complexity, type, question, img_question, answers, img_answers, true_answers } = req.body;

  console.log("controller", req.body)

  const newTest = new Test({
    complexity, 
    type, 
    question, 
    img_question, 
    answers, 
    img_answers, 
    true_answers
  });

  await newTest.save();
  res.json({message: 'Test created successfully!'});
};


module.exports.getTestsInfo = async (req, res) => {
  const testsInfo = await testDao.findTests();
  res.json(testsInfo); 
};

module.exports.getTestInfo = async (req, res) => {
  console.log("getTestInfo")
  console.log(req.params.testId)
  const testInfo = await testDao.findTestById(req.params.testId);
  console.log(testInfo)
  res.json({test: testInfo});
};


module.exports.changeTest = async (req, res) => {
  const { complexity, type, question, img_question, answers, img_answers, true_answers } = req.body;
  const test = await testDao.findTestById(req.params.testId);

  await test.updateOne({
    complexity, 
    type, 
    question, 
    img_question, 
    answers, 
    img_answers, 
    true_answers
  });

  res.json({message: 'Test changed successfully!'});
};


module.exports.deleteTest = async (req, res) => {
  const testId = req.params.testId
  const test = await testDao.findTestById(testId);

  const games = await Game.find({})
    .catch((err) => {
      console.error(err.message);
    });

  // let exit = true;

  if(games) {
    for(let i = 0; i < games.length; i++) {
      for(let j = 0; j < games[i].rounds.length; j++) {
        if(testId in games[i].rounds[j]) {
          delete games[i].rounds[j][testId];
          if(JSON.stringify(games[i].rounds[j]) == "{}"){
            games[i].rounds.splice(j, 1);
            if(games[i].rounds.length === 0){
              await games[i].deleteOne();
              games.splice(i, 1);
              i--;
              break;
            }
            j--;
          }
          await games[i].updateOne({rounds : games[i].rounds});
        }
      }
    }
  }

  // if(games) {
  //   for(let i = 0; i < games.length; i++) {
  //     exit = true;
  //     for(let j = 0; exit && j < games[i].rounds.length ; j++) {
  //       for(let k = 0; exit && k < games[i].rounds[j].length; k++) {
  //         if(games[i].rounds[j][k] === testId) {
  //           games[i].rounds[j].splice(k, 1);
  //           if(games[i].rounds[j].length === 0) {
  //             games[i].rounds.splice(j, 1);
  //             if(games[i].rounds.length === 0){
  //               await games[i].deleteOne();
  //               games.splice(i, 1);
  //               i--;
  //               exit = false;
  //             } else {
  //               await games[i].updateOne({rounds : games[i].rounds});
  //               j--;
  //               break;
  //             }
  //           } else{
  //             await games[i].updateOne({rounds : games[i].rounds});
  //             k--;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

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

