module.exports = (io, socket) => {
  // обрабатываем запрос на получение пользователей
  // свойство "roomId" является распределенным,
  // поскольку используется как для работы с пользователями,
  // так и для работы с сообщениями
  const getUsers = () => {
    io.in(socket.roomId).emit('CONNECT_PLAYER', users)
  }

  const addUser = ({ username, userId }) => {
    // проверяем, имеется ли пользователь в БД
    if (!users[userId]) {
      // если не имеется, добавляем его в БД
      users[userId] = { username, online: true }
    } else {
      // если имеется, меняем его статус на онлайн
      users[userId].online = true
    }
    // выполняем запрос на получение пользователей
    getUsers()
  }


}