require('dotenv').config(); //Загрузка переменных из среды .env

const mongoose = require('mongoose'); 
const express = require('express');
const morgan = require('morgan');

const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');
const testsRouter = require('./routers/testsRouter');
const gamesRouter = require('./routers/gamesRouter');
// const trucksRouter = require('./routers/trucksRouter');
// const loadsRouter = require('./routers/loadsRouter');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/auth', authRouter);
app.use('/api/users/me', usersRouter);
app.use('/api/tests', testsRouter);
app.use('/api/games', gamesRouter);
// app.use('/api/trucks', trucksRouter);
// app.use('/api/loads', loadsRouter);
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


//mongodb+srv://snezhka_18:<password>@cluster0.kpnu9.mongodb.net/test