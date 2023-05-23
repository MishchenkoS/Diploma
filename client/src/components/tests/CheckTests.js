import React, { useEffect, useState, useRef } from "react";

export const CheckTests = (formArg) => {
  const {formArg: form, setFormArg: setForm, count: countVariant, setCount: setCountVariant } = formArg;

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
  }

  const changeAnswers = async (event) => {
    setForm((form) => {
      const answers = [...form.answers];
      answers[event.target.name] = event.target.value;
      return { ...form, answers }
   });
  }


  const changeComplexity = (event) => {
    setForm({...form, "complexity": +event.target.value});
  }


  const addVariant = () => {
    setCountVariant((countVariant) => 
    [...countVariant, countVariant.length+1]
   );

   setForm((form) => {
     const answers = [...form.answers];
     answers.push("");
     return { ...form, "answers": answers }
  });
  }

  const changeCheck = (event) => {
    const index = form.true_answers.indexOf(+event.target.id);

    if(index === -1) {
        setForm((form) => {
          const true_answers = [...form.true_answers, +event.target.id];
          return {...form, true_answers};
        })
    } else {
      setForm((form)=>{
        const true_answers = [...form.true_answers];
        true_answers.splice(index, 1);
        return {...form, true_answers};
      })
    }
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
      // {...form, "complexity": +event.target.value}
    });
    
    setCountVariant((countVariant)=>{
      const count_variant = [...countVariant];
      count_variant.splice(event.target.name, 1);
      return count_variant;
    })
    const check = document.getElementById(`${event.target.name}`);
    check.checked = false;
  }

  return (
  <div>
    <label>Введіть складність:</label>
    <input 
      type='number'
      placeholder='0' 
      autoComplete='off'
      onChange={changeComplexity} 
      name="complexity"
      min={0}
      required
      value={form.complexity}
    />
    <label>Введіть запитання:  </label>
      <input 
      type='text' 
      name='question' 
      autoComplete='off' 
      placeholder='Запитання' 
      required 
      onChange={changeHandler}
      value={form.question}
      />

    {countVariant.map((item, index)=>{
      const check = form.true_answers.indexOf(index) !== -1 ? true : false;
      return(
        <div key={index}>
        <label>
          {check && <input 
            type='checkbox' 
            id={index} 
            name='true_answers'
            value={form.answers[index]}
            defaultChecked
            onChange={changeCheck}
          />}
          {!check && <input 
            type='checkbox' 
            id={index} 
            name='true_answers'
            value={form.answers[index]}
            onClick={changeCheck}
          />}

         
          <span></span>
        </label>  
        <label>Варіант {index + 1}</label>
        <i className="material-icons right">
          <a href='#' className='a-clear' name={index} onClick={clearVariant} >clear</a>
        </i>
        <input 
          type='text' 
          name={index} 
          placeholder={`Варіант ${index + 1}`}
          value={form.answers[index]}
          autoComplete='off'
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
    >Додати варіант
      <i className="material-icons right">add</i>
    </button>
    </div>
   
  </div>
  );
}