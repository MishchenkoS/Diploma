import React from "react";

export const RadioTests = () => {
  return (
  <div>
    <label>Введите вопрос:  </label>
      <input type='text' name='question' placeholder='Вопрос' />
      <input type='hidden' name='type' value='radio'/>
    <label>Вариант 1</label>
      <input type='radio' name='radioBtn' value='var1'/>
      <input type='text' name='variant1' placeholder='Вариант 1'/>
    
    <label>Вариант 2</label>
      <input type='radio' name='radioBtn' value='var2'/>
      <input type='text' name='variant2' placeholder='Вариант 2'/>
    <input type='button' class='add-variant' value='Добавить вариант'/>
    <input type='submit' value='Добавить тест'/>
  </div>
  );
}