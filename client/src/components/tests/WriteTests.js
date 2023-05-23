import React, { useState } from "react";

export const WriteTests = (formArg, setFormArg) => {
  const {formArg: form, setFormArg: setForm} = formArg;

  const changeQuestion = (event) => {
    setForm({...form, "question": event.target.value});
  }

  const changeAnswer = (event) => {
    setForm({...form, "answers": [event.target.value], "true_answers": [0]});
  }

  const changeComplexity = (event) => {
    setForm({...form, "complexity": +event.target.value});
  }


  return (
  <div>
    <label>Введіть складність:</label>
    <input 
      type='number'
      placeholder='0' 
      autoComplete="off"
      onChange={changeComplexity} 
      name="complexity"
      value={form.complexity}
      min={0}
      required
    />
    <label>Введіть запитання:  </label>
    <input 
      type='text' 
      autoComplete='off'
      onChange={changeQuestion} 
      name='question' 
      placeholder='Запитання' 
      value={form.question}
      required
    />
    <label>Відповідь</label> 
    <input 
      type='text' 
      autoComplete='off'
      onChange={changeAnswer} 
      name='variant' 
      placeholder='Відповідь' 
      value={form.answers[0]}
      required
    />
      

   
  </div>
  );
}