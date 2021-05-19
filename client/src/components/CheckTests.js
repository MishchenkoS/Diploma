import React, { useState } from "react";

export const CheckTests = () => {
  const [countVariant, setCountVariant] = useState([1,2]);

  const addVariant = () => {
    setCountVariant([...countVariant, countVariant.length+1]);
  }

  return (
  <div>

    <label>Введите вопрос:  </label>
      <input type='text' name='question' placeholder='Вопрос' />
      <input type='hidden' name='type' value='radio'/>

    {countVariant.map((item, index)=>{
      return(
      <>
        <label>Вариант {item}</label>
        <label for={`check${item}`}>
          <input type='checkbox' id={`check${item}`} name='checkBtn' value={`var${item}`}/>
          <span></span>
        </label>  
        <input type='text' name={`variant${item}`} placeholder={`Вариант ${item}`}/>
        
      </>
      )
    })}
    <input type='button' onClick={addVariant} class='add-variant' value='Добавить вариант'/>
   
  </div>
  );
}