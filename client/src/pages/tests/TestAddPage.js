import React, { useState, useContext, useEffect, useCallback } from "react";
import { Loader } from "../../components/Loader"; 
import { AuthContext } from "../../context/authContext";
import { testAddContext } from "../../context/testAddContext"
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";
import { RadioTests } from "../../components/tests/RadioTest";
import { CheckTests } from "../../components/tests/CheckTests";
import { WriteTests } from "../../components/tests/WriteTests";

//Добавить картинки
export const TestAddPage = () => {
  const {token} = useContext(AuthContext);
  // let {type, complexity, question, answers, true_answers} = useContext(testAddContext);
  const message = useMessage();
  const {loading, error, request, clearError} = useHttp();
  const [type, setType] = useState(null);
  const [count, setCount] = useState([1,2]);
  const [form, setForm] = useState({
    type: "",
    complexity: 0,
    question: "",
    img_question: "",
    photo_question: "",
    answers: [""],
    img_answers: [""],
    photo_answers: [""],
    true_answers: []
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const changeSelect = (event) => {

    setForm({
      [event.target.name]: event.target.value, 
      complexity: 0,
      question: "",
      img_question: "",
      photo_question: "",
      answers: [""],
      img_answers: [""],
      photo_answers: [""],
      true_answers: []
    });
    setType(event.target.value)
  }

  const testAdd = async () => {
    try {
      // setForm((form)=>{
      //   const answers = [...form.answers];
      //   const true_answers = form.true_answers.map((item)=>{
      //     item = answers[item];
      //     return item;
      //   });
      //   return {...form, true_answers};
      // });

      const true_answers = form.true_answers.map((item)=>{
        item = form.answers[item];
          return item;
      });

      const form_request = {
        type: form.type,
        complexity: form.complexity,
        question: form.question,
        img_question: form.img_question,
        answers: form.answers,
        img_answers: form.img_answers,
        true_answers 
      };

      console.log(form_request);
      if(form_request.true_answers.length
        && form_request.answers.length){
        console.log('if') 
        // console.log('formdata', new FormData(form_request))
        const data = await request('/api/tests/test', 'POST', {...form_request}, {
          Authorization: `Bearer ${token}`
        });
        // const data = await fetch('/api/tests/test', {
        //   method: 'POST',
        //   body: new FormData(form_request),
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // })
        message(data.message);
      } else {
        message("Не все поля заполнены");
        console.log(form_request)
      }


      console.log(form_request)

      

      setForm((form=>({
        type: "",
        complexity: 0,
        question: "",
        img_question: "",
        photo_question: "",
        answers: [""],
        img_answers: [""],
        photo_answers: [""],
        true_answers: []
      })))
    } catch (error) {
      
    }

    return false;
  }

  // const registerHandler = async () => {
  //   try {
  //     const data = await request('/api/auth/register', 'POST', {...form});
  //     message(data.message);
  //   } catch (error) {
      
  //   }
 
  // }

  useEffect(() => {
    const select = document.querySelectorAll('select');
    const instances = window.M.FormSelect.init(select, {});

    // const formHtml = document.querySelector('form');
    // formHtml.addEventListener('submit', testAdd, false);

  }, []);

  return (
    <>
      <div>
        <h5>Создать новый тест</h5>
      </div>
      <form action="" onSubmit={e => { e.preventDefault(); }}>
      <div className="col s12 darken-1">
      
      <label>Выберите тип теста</label>
        <select defaultValue="" name="type" onChange={changeSelect} required>
          <option value="" disabled>---</option>
          <option value="RADIO">Один вариант ответа</option>
          <option value="CHECK">Несколько вариантов ответа</option>
          <option value="WRITE">Вписать значение в поле</option>
        </select>

      </div>
      {console.log(form)}
      {type && type==="RADIO" && 
      <RadioTests formArg={form} setFormArg={setForm} count={count} setCount={setCount}></RadioTests>}
      {type && type==="CHECK" && 
      <CheckTests formArg={form} setFormArg={setForm} count={count} setCount={setCount}></CheckTests>}
      {type && type==="WRITE" && 
      <WriteTests formArg={form} setFormArg={setForm}></WriteTests>}
      {/* {console.log(form)} */}
      <div className='div-btn'>
      <button  
        type='submit' 
        onClick={testAdd} 
        className="btn waves-effect waves-light indigo lighten-1 btn-add"
      >Создать тест<i className="material-icons right">send</i></button>
      </div>
      </form>
    </>
    // <div>
    //   <div className="input-field">
    //     <input 
    //       placeholder="Введите login"
    //       id="login"
    //       type="text"
    //       name="login"
    //       onChange={changeHandler}
    //       value={form.login}
    //     />
    //     <label htmlFor="login">Login</label>
    //   </div>

    //   <div className="input-field">
    //     <input 
    //       placeholder="Введите пароль"
    //       id="password"
    //       type="password"
    //       name="password"
    //       onChange={changeHandler}
    //       value={form.password}
    //     />
    //     <label htmlFor="password">Пароль</label>
    //   </div>

    //   <div className="input-field">
    //     <input 
    //       placeholder="Введите имя"
    //       id="firstname"
    //       type="text"
    //       name="firstname"
    //       onChange={changeHandler}
    //       value={form.firstname}
    //     />
    //     <label htmlFor="firstname">Имя</label>
    //   </div>

    //   <div className="input-field">
    //     <input 
    //       placeholder="Введите фамилию"
    //       id="lastname"
    //       type="text"
    //       name="lastname"
    //       onChange={changeHandler}
    //       value={form.lastname}
    //     />
    //     <label htmlFor="lastname">Фамилия</label>
    //   </div>

    //   <div className="input-field">
    //     <input 
    //       placeholder="Введите группу"
    //       id="group"
    //       type="text"
    //       name="group"
    //       onChange={changeHandler}
    //       value={form.group}
    //     />
    //     <label htmlFor="group">Группа</label>
    //   </div>

    //   <div className="input-field">
    //     <input 
    //       placeholder="Введите команду"
    //       id="team"
    //       type="text"
    //       name="team"
    //       onChange={changeHandler}
    //       value={form.team}
    //     />
    //     <label htmlFor="team">Команда</label>
    //   </div>

    //   <div className="input-field">
    //     <button 
    //     type="submit" 
    //     onClick={registerHandler}
    //     disabled={loading}
    //     >
    //       Зарегистрировать
    //     </button>
    //   </div>

    //   {/* <a href="/login">Login</a> */}
    // </div>

  );

}