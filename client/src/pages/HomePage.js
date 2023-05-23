import React from "react"

export const HomePage = () => {

  const click = () => {
    window.location.href = "/online";
  }
  return (
    <>
  <section className="rules row">
  <div className="rules-description col s6">
    <h2 className="animation">Запрошуємо всіх бажаючих взяти участь в змаганні!!!</h2>
    <h4>Правила гри:</h4>
    <p>1. Пройдіть авторизацію для участі в змаганні</p>
    <p>2. Попросіть адміністратора зареєструвати вас на певну гру</p>
    <p>3. Якщо ви граєте в команді, дійте злагоджено і ефективно. Командна робота дозволяє досягти кращого успіху!</p>
    <p>4. За кожний тест можно набрати певну кількість балів</p>
    <p>5. Перемагає той гравець (команда), який набрав більше за всіх балів за гру.</p>
    <h6 className="rules-wish">Успіхів! Ми віримо у тебе ;)</h6>
    <button onClick={click} className="btn waves-effect waves-light indigo lighten-1 btn-add">РОЗПОЧАТИ БИТВУ</button>
  </div>
</section>
  </>  
  );
}