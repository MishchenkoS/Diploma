import React, { useState, useContext, useEffect } from "react";
import { Loader } from "../Loader";

export const RadioTests = (formArg) => {
  const {formArg: form, setFormArg: setForm, count: countVariant, setCount: setCountVariant } = formArg;
  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
  }

  const changeRadio = (event) => {
    setForm({...form, "true_answers": [+event.target.id]})
  }

  const changeAnswers = async (event) => {
    setForm((form) => {
      const answers = [...form.answers];
      answers[event.target.name] = event.target.value;
      return { ...form, answers }
   });
  }

  useEffect(() => {
    window.M.updateTextFields()
  }, [])


  const addVariant = () => {
    setCountVariant((countVariant) => 
      [...countVariant, countVariant.length+1]
    );

    setForm((form) => {
      const answers = [...form.answers];
      answers.push("");
      return { ...form, answers};
   });
  }

  const changeComplexity = (event) => {
    setForm({...form, "complexity": +event.target.value});
  }

  const clearVariant = (event) => {
    setForm((form)=>{
      const answers = [...form.answers];
      const true_answers = [...form.true_answers];
      const index = true_answers.indexOf(+event.target.name);
      if(index !== -1) {
        true_answers.splice(index, 1);
      }
      answers.splice(+event.target.name, 1);
      return {...form, answers, true_answers}
    });
    
    setCountVariant((countVariant)=>{
      const count_variant = [...countVariant];
      count_variant.splice(event.target.name, 1);
      return count_variant;
    })

    const radio = document.getElementById(`${event.target.name}`);
    radio.checked = false;
  }




  if(!countVariant) {
    return <Loader></Loader>
  }

  return (
  <div>
    <label>Введите сложность:</label>
    <input 
      type='number'
      placeholder='0' 
      autoComplete='off'
      onChange={changeComplexity} 
      value={form.complexity}
      name="complexity"
      min={0}
      required
    />
    <label>Введите вопрос:  </label>
    <input 
      type='text' 
      name='question' 
      autoComplete='off'
      placeholder='Вопрос' 
      onChange={changeHandler}
      value={form.question}
      required
    />

    {countVariant.map((item, index)=>{
      const check = form.true_answers.indexOf(index) !== -1 ? true : false;
      return(
      <div key={index}>
        <label>
          {check && <input 
            type='radio' 
            name='true_answers' 
            id={index}
            value={form.answers[index]} 
            className='with-gap'
            checked
            onChange={changeRadio}
          />}
          {!check && <input 
            type='radio' 
            name='true_answers' 
            id={index}
            value={form.answers[index]} 
            className='with-gap'
            onChange={changeRadio}
          />}
          <span className='span-radio'></span>
        </label>
        <label>Вариант {index + 1}</label>
        <i className="material-icons right">
          <a href='#' className='a-clear' name={index} onClick={clearVariant}>clear</a>
        </i>
        <input 
          type='text' 
          name={index} 
          placeholder={`Вариант ${index + 1}`}
          value={form.answers[index]}
          autoComplete="off"
          onChange={changeAnswers}
          required
        />
      </div>
      )
    })}
    <div className='div-btn'>
    <button 
    onClick={addVariant} 
    className='add-variant btn waves-effect waves-light indigo lighten-1 btn-add' 
    >Добавить вариант
      <i className="material-icons right">add</i>
    </button>
    </div>
  </div>
  );
}