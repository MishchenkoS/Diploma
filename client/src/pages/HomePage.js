import React, { useState, useContext, useEffect, useCallback } from "react"
import { Link, useParams } from "react-router-dom";
import { useHttp } from "../hooks/httpHooks";
import { useMessage } from "../hooks/messageHook";

import { AuthContext } from "../context/authContext"
export const HomePage = () => {
  // const message = useMessage();
  // const {loading, error, request, clearError} = useHttp();
  // const {token, role} = useContext(AuthContext);
  // const testId = useParams().testId;

  // console.log(role)

  // const [form, setForm] = useState({
  //   photo: null,
  //   testId
  // })
  // const formSubmit = async () => {
  //   console.log({...form.photo})
  //   const data =  await request(`/api/tests/photo`, 'POST', {photo: form.photo, testId}, {
  //     // 'Content-Type': 'form-data',
  //   });
  //   message(data.message);
  // }

  // const handleChange = (event) => {
  //   console.log(event.target.files[0]);
  //   console.log(event.target.files[0].name);
  //   const blob = new Blob([event.target.files[0]], {type:'image/jpg'});
  //   let reader = new FileReader();
  //   reader.readAsDataURL(blob);
  //   // const formData = new FormData();
  //   // formData.append(event.target.files[0].name, event.target.files[0]);
  //   reader.onload = function() {
  //     setForm({
  //       img: `${reader.result}`,
  //       // img: formData,
  //       photo: blob,
  //       testId
  //     });
  //   }
  //   // console.log(formData)

  //   // setForm({
  //   //   photo: event.va
  //   // })
  // }

  // const getIMG = async () => {
  //   const data =  await request(`/api/tests/${testId}`, 'GET');
  //   console.log(data.photo)
  //   setForm({
  //     img: data.photo,
  //     testId
  //   });

  //   // message(data.message);
  // }


  return (
    <>
  <section className="rules row">
  <div className="rules-description col s6">
    <h2 className="animation">Приглашаем всех желающих принять участие в соревновании!!!</h2>
    <h4>Правила игры:</h4>
    <p>1. Пройдите авторизацию для участия в соревновании</p>
    <p>2. Для каждого хода есть определённое установленное время. Если время вышло, ответить уже не будет возможности</p>
    <p>3. Если вы играете в команде, действуйте сглаженно и эфективно. Командная работа даёт лучший успех!</p>
    <p>4. На каждом раунде у игрока (команды) есть возможность набрать максимум 3 очка.</p>
    <p>5. Побеждает тот игрок (команда), который набрал больше всех количество очков за игру.</p>
    <h6 className="rules-wish">Успехов! Мы верим, у тебя всё получится ;)</h6>
    <button className="btn waves-effect waves-light indigo lighten-1 btn-add">НАЧАТЬ СРАЖЕНИЕ</button>
  </div>
</section>



  </>


    /* <div>HomePage</div>
    <form action="" onSubmit={e => { e.preventDefault(); }}>
      <input name="photo" accept=".png, .jpg" type="file" onChange={handleChange}></input>
      <img src={form.img}/>
      <button type='submit' onClick={formSubmit}>Submit</button>
    </form>
    <button onClick={getIMG}>Загрузить</button> */
  
  );
}