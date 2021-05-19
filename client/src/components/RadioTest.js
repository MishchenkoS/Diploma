import React, { useState } from "react";

export const RadioTests = (formArg, setFormArg) => {
  const {formArg: form, setFormArg: setForm} = formArg;
  const [countVariant, setCountVariant] = useState([1,2]);
  const [answers, setAnswers] = useState([""]);
  const [trueAnswers, setTrueAnswers] = useState(null);

  console.log("answers", answers)
  console.log("form", form)
  console.log("trueAnswers", trueAnswers)

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: [event.target.value]})
  }

  const changeRadio = (event) => {
    // console.log(event.target.value);
    setTrueAnswers(event.target.value);
    // console.log(trueAnswers)
    // trueAnswers = event.target.value;
  }

  const changeAnswers = (event) => {
    setAnswers(()=>{
      console.log(form.true_answers[0]);
      console.log(answers[event.target.name])
      if(trueAnswers === answers[event.target.name]){
        console.log(event.target.value)
        // setForm({...form, form["true_answers"]: [1]})
        setTrueAnswers(event.target.value)
        // trueAnswers = event.target.value
        console.log(trueAnswers)
      }
      answers[event.target.name] = event.target.value;
      return answers;
    })

    console.log(form)

    setForm({...form, "answers": answers, "true_answers": trueAnswers});
    console.log(form)
    // form.setForm({...form.form, [name]: [...form.form[name], event.target.value]})
  }



  const addVariant = () => {
    setCountVariant([...countVariant, countVariant.length+1]);
  }

  return (
  <div className="input-field">
    <label>Введите вопрос:  </label>
      <input 
        type='text' 
        name='question' 
        placeholder='Вопрос' 
        onChange={changeHandler}
      />
      {/* <input type='hidden' name='type' value='radio'/> */}

    {countVariant.map((item, index)=>{
      return(
      <div key={`${item}`}>
        <label>Вариант {item}</label>
        <label>
          <input 
            type='radio' 
            name='true_answers' 
            value={answers[index]} 
            onChange={changeRadio}
          />
          <span></span>
        </label>
        <input 
          type='text' 
          name={index} 
          placeholder={`Вариант ${item}`}
          value={answers[index]}
          onChange={changeAnswers}
        />
      </div>
      )
    })}
    <input type='button' onClick={addVariant} class='add-variant' value='Добавить вариант'/>
  </div>
  );
}