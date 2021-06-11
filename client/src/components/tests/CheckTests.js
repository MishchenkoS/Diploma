import React, { useEffect, useState, useRef } from "react";

export const CheckTests = (formArg) => {
  // const {formArg: form, setFormArg: setForm} = formArg;
  // const [countVariant, setCountVariant] = useState([1,2]);
  // // const [answers, setAnswers] = useState([""]);
  // const [trueAnswers, setTrueAnswers] = useState([]);
  // const [checkbox, setCheckbox] = useState([false, false]);
  // console.log(form)
  // // console.log(trueAnswers)
  // // console.log(checkbox)


  const {formArg: form, setFormArg: setForm, count: countVariant, setCount: setCountVariant } = formArg;
  // const didMountRef = useRef(false);
  // const [countVariant, setCountVariant] = useState([1,2]);
  // let [trueAnswers, setTrueAnswers] = useState([]);
  console.log(form)



  const changeHandler = (event) => {
    // setTrueAnswers(event.target.id);
    setForm({...form, [event.target.name]: event.target.value});
  }

  // const changeCheck = (event) => {
  //   const index = form.true_answers.indexOf(+event.target.id);
  //   if(index === -1){
  //     setForm({...form, "true_answers": [...form.true_answers, +event.target.id]})
  //   } else {
  //     console.log("else")
  //     setForm(()=>{
  //       form.true_answers.splice(index, 1);
  //       return {...form, "true_answers": form.true_answers}
  //     })
  //   }
  // }

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
   console.log(countVariant)

   setForm((form) => {
     const answers = [...form.answers];
     answers.push("");
     return { ...form, "answers": answers }
  });
  }



  
  
  // const clickCheck = (event) => {
    // setCheckbox(()=>{
    //   checkbox[event.target.id] = !checkbox[event.target.id]
    //   return checkbox;
    // });
  // }


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
      console.log(event.target.name)
      const count_variant = [...countVariant];
      console.log(count_variant);
      count_variant.splice(event.target.name, 1);
      return count_variant;
    })
    // console.log()
    // console.log(form);
    const check = document.getElementById(`${event.target.name}`);
    check.checked = false;

    console.log(countVariant)
  }



  //   setCheckbox(()=>{
  //     checkbox[event.target.id] = !checkbox[event.target.id]
  //     return checkbox;
  //   });
  //   if(checkbox[event.target.id]){
  //     if(form.true_answers.length === 0) {
  //       setForm(()=>{
  //         form.true_answers = [+event.target.id];
  //         return form;
  //       });
  //     } else {
  //       setForm(()=>{
  //         form.true_answers = [...form.true_answers, +event.target.id];
  //         return form;
  //       })
  //     }
  //   } else {
  //     setForm(()=>{
  //       const index = form.true_answers.indexOf(+event.target.id);
  //       form.true_answers.splice(index, 1);
  //       return form;
  //     });
  //   }
  // }




    // const index = form.true_answers.indexOf(+event.target.id);
    // console.log(index)
    // if(index === -1) {
      // if(form.true_answers.length === 0) {
      //   setForm(()=>{
      //     form.true_answers = [+event.target.id];
      //     return form;
      //   })
    //   } else {
        // form.true_answers = [...form.true_answers, +event.target.id];
        // return form;
    //   }

    // } else {
    //   console.log(2)
    //   setForm(()=>{
    //     form.true_answers.splice(index, 1);
    //     return form;
    //   })
    // }


    // console.log(form)
    // setCheckbox(()=>{
    //   checkbox[event.target.id] = !checkbox[event.target.id]
    //   return checkbox;
    // });
    // console.log(checkbox)

    // if(checkbox[event.target.id]) {

    // }

    // if(checkbox[event.target.id]) {
    //   setTrueAnswers([...trueAnswers, event.target.id]);
    //   console.log(trueAnswers)
    // }

    // console.log(event.target.value);

    // console.log(checkbox[event.target.id])
    // if(checkbox[event.target.id]) {

    //   // setTrueAnswers([...trueAnswers, event.target.id]);
    
    //   // console.log(trueAnswers)
    // //   console.log(event.target.id)
    // //   // console.log([...trueAnswers, event.target.id])
    // //   // setTrueAnswers([...trueAnswers, event.target.id]);
    // //   // console.log(trueAnswers)

    //   setForm(()=>{
    //     console.log("hell")
    //     form.true_answers.push(+event.target.id)
    //     // if(form.true_answers.length===0) {
    //     //   console.log(5)
    //     //   form.true_answers.push(+event.target.id)
    //     // } else {
    //     //   console.log(4)
    //     //   form.true_answers = [...form.true_answers, +event.target.id];
    //     // }

    //     return form;
    //   })
    //   console.log(form)
    // } else {
    //   // setTrueAnswers(()=>{
    //   //   const index = trueAnswers.indexOf(event.target.id);
    //   //   trueAnswers.splice(index, 1);
    //   //   return trueAnswers;
    //   // });
    //   console.log(2)
      // setForm(()=>{
      //   const index = form.true_answers.indexOf(event.target.id);
      //   form.true_answers.splice(index, 1);
      //   return form;
      // });
    // }

    // console.log(form)
    // console.log(trueAnswers)
    // trueAnswers = event.target.value;
  // }

  // const changeAnswers = (event) => {
  //   setForm(()=>{
  //     console.log('hdd')
  //     form.answers[event.target.name] = event.target.value;
  //     return {
  //       ...form
  //     }
  //   });
  // }

  return (
  <div>
    <label>Введите сложность:</label>
    <input 
      type='number'
      placeholder='0' 
      autoComplete='off'
      onChange={changeComplexity} 
      name="complexity"
      min={0}
      required
    />
    <label>Введите вопрос:  </label>
      <input type='text' name='question' autoComplete='off' placeholder='Вопрос' required onChange={changeHandler}/>

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
        <label>Вариант {index + 1}</label>
        <i className="material-icons right">
          <a href='#' className='a-clear' name={index} onClick={clearVariant} >clear</a>
        </i>
        <input 
          type='text' 
          name={index} 
          placeholder={`Вариант ${index + 1}`}
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
    >Добавить вариант
      <i className="material-icons right">add</i>
    </button>
    </div>
   
  </div>
  );
}