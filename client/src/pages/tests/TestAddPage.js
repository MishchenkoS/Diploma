import React, { useState, useContext, useEffect, useCallback } from "react";
import { Loader } from "../../components/Loader"; 
import { AuthContext } from "../../context/authContext";
import { testAddContext } from "../../context/testAddContext"
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";
import { RadioTests } from "../../components/tests/RadioTest";
import { CheckTests } from "../../components/tests/CheckTests";
import { WriteTests } from "../../components/tests/WriteTests";

export const TestAddPage = () => {
  const {token} = useContext(AuthContext);
  const message = useMessage();
  const {loading, error, request, clearError} = useHttp();
  const [type, setType] = useState(null);
  const [count, setCount] = useState([1,2]);
  const [form, setForm] = useState({
    type: "",
    complexity: 0,
    question: "",
    answers: [""],
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
      answers: [""],
      true_answers: []
    });
    setType(event.target.value)
  }

  const testAdd = async () => {
    try {
      const true_answers = form.true_answers.map((item)=>{
        item = form.answers[item];
          return item;
      });

      const form_request = {...form, true_answers};

      if(form_request.true_answers.length
        && form_request.answers.length){
        const data = await request('/api/tests/test', 'POST', {...form_request}, {
          Authorization: `Bearer ${token}`
        });
        message(data.message);
        window.location.href = "/tests"
      } else {
        message("Не все поля заполнены");
      }

      setForm((form=>({
        type: "",
        complexity: 0,
        question: "",
        answers: [""],
        true_answers: []
      })))
    } catch (error) { }

    return false;
  }

  useEffect(() => {
    const select = document.querySelectorAll('select');
    const instances = window.M.FormSelect.init(select, {});
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
      {type && type==="RADIO" && 
      <RadioTests formArg={form} setFormArg={setForm} count={count} setCount={setCount}></RadioTests>}
      {type && type==="CHECK" && 
      <CheckTests formArg={form} setFormArg={setForm} count={count} setCount={setCount}></CheckTests>}
      {type && type==="WRITE" && 
      <WriteTests formArg={form} setFormArg={setForm}></WriteTests>}
      <div className='div-btn'>
      <button  
        type='submit' 
        onClick={testAdd} 
        className="btn waves-effect waves-light indigo lighten-1 btn-add"
      >Создать тест<i className="material-icons right">send</i></button>
      </div>
      </form>
    </>
  );
}