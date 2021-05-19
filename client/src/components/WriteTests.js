import React, { useState } from "react";

export const WriteTests = () => {

  return (
  <div>
    <label>Введите вопрос:  </label>
      <input type='text' name='question' placeholder='Вопрос' />
      <input type='hidden' name='type' value='radio'/>
    <label>Ответ</label> 
    <input type='text' name='variant' placeholder='Ответ' />
      

   
  </div>
  );
}