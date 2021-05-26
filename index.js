require('dotenv').config(); //Загрузка переменных из среды .env

const mongoose = require('mongoose'); 
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const { createBucket } = require('mongoose-gridfs');
const WebSocket = require('ws');


const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');
const testsRouter = require('./routers/testsRouter');
const gamesRouter = require('./routers/gamesRouter');
const tournamentsRouter = require('./routers/tournamentRouter');

const PORT = process.env.PORT || 8080;
const ws = new WebSocket('ws://locallhost:8080');
const app = express();
// const storage = createBucket(); // createBucket(optns)
// const upload = multer({ storage });

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/auth', authRouter);
app.use('/api/users/me', usersRouter);
app.use('/api/tests', testsRouter);
app.use('/api/games', gamesRouter);
app.use('/api/tournaments', tournamentsRouter);
app.use((err, req, res, next) => res.status(500).json({message: err.message}));

const start = async () => {
  await mongoose.connect('mongodb+srv://snezhka_18:snezhka@cluster0.kpnu9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  app.listen(PORT);
};

start();


