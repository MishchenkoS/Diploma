const { Game } = require('../models/gameModel');

module.exports.findGames = async () => {
  const games = await Game.find({})
    .catch((err) => {
      console.error(err.message);
    });

  if (!games || games.length === 0) {
    throw new Error('No games found');
  }

  return games;
};

module.exports.findGameByName = async (nameGame) => {
  const game = await Game.findOne({nameGame})
    .catch((err) => {
      console.error(err.message);
    });

  if (game) {
    throw new Error(`Game ${nameGame} already exists`);
  }
  return game;
};

module.exports.findGameById = async (id) => {
  const game = await Game.findById(id)
    .catch((err) => {
      console.error(err.message);
    });
  
  if (!game) {
    throw new Error('No game found');
  }
  return game;
} 