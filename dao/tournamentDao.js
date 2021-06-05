const { Tournament } = require('../models/tournamentModel');

module.exports.findTournaments = async () => {
  const tournaments = await Tournament.find({})
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournaments || tournaments.length === 0) {
    throw new Error('No tournaments found');
  }
  return tournaments;
};

module.exports.findTournamentById = async (id) =>  {
  const tournament = await Tournament.findById(id)
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournament) {
    throw new Error('No tournament found');
  }
  return tournament;
}

module.exports.findTournamentByParam = async (param, value) => {
  console.log(param, value)
  const tournaments = await Tournament.find({
    [param]: {$in: [...value]},
  })
  .catch((err) => {
    console.error(err.message);
  });

  if (!tournaments || tournaments.length === 0) {
    throw new Error('No tournaments found');
  }
  return tournaments;
}

module.exports.findTournamentAndUpdateById = async (id, param, value) => {
  await Tournament.findByIdAndUpdate(id, {[param]: value});
}