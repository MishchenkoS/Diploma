import React from "react"

export const HomePage = () => {

  const click = () => {
    window.location.href = "/online";
  }
  return (
    <>
  <section className="rules row">
  <div className="rules-description col s6">
    <h2 className="animation">Приглашаем всех желающих принять участие в соревновании!!!</h2>
    <h4>Правила игры:</h4>
    <p>1. Пройдите авторизацию для участия в соревновании</p>
    <p>2. Попросите администратора зарегестрировать вас на определенную игру</p>
    <p>3. Если вы играете в команде, действуйте слаженно и эфективно. Командная работа даёт лучший успех!</p>
    <p>4. За каждый тест можно набрать определенное количество балов</p>
    <p>5. Побеждает тот игрок (команда), который набрал больше всех количество очков за игру.</p>
    <h6 className="rules-wish">Успехов! Мы верим, у тебя всё получится ;)</h6>
    <button onClick={click} className="btn waves-effect waves-light indigo lighten-1 btn-add">НАЧАТЬ СРАЖЕНИЕ</button>
  </div>
</section>
  </>  
  );
}