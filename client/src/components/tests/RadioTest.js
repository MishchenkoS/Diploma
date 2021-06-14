import React, { useState, useContext, useEffect } from "react";
// import { testAddContext } from "../../context/testAddContext"
import { Loader } from "../Loader";

export const RadioTests = (formArg) => {
  console.log(formArg)
  // let {type, complexity, question, answers, true_answers} = useContext(testAddContext);
  // const [countVariant, setCountVariant] = useState([1,2]);
  // console.log(type);

  // const changeRadio = (event) => {
  //   true_answers[0] = event.target.value;
  // }

  // const changeAnswers = (event) => {
  //   if(true_answers[0]===answers[event.target.name]) {
  //     true_answers[0] = event.target.value;
  //   }
  //   answers[event.target.name] = event.target.value;
  // }

  // const changeHandler = (event) => {

  // }


  const {formArg: form, setFormArg: setForm, count: countVariant, setCount: setCountVariant } = formArg;
  // const [countVariant, setCountVariant] = useState(null);

  // useEffect(()=>{
  //   if(form.answers != 0) {
  //     setCountVariant((count) => {
  //       let cv = [];
  //       form.answers.forEach((item, index)=>{
  //         cv.push(index);
  //       });
  //       return cv;
  //     }) 
  //     setOk(true);
  //   } else {
  //     setCountVariant((count) => {
  //       return [1,2];
  //     });
  //     setOk(true);
  //   }

  // },[countVariant, ok])


  // console.log(formArg)
  // if(form.answers.length !== 0) {
  //   setCountVariant([]);
  //   for(let i = 0; i < form.answers.length; i++){
  //     setCountVariant((countVariant)=>{
  //       countVariant.push(i);
  //       return countVariant
  //     })
  //   }
  //   // setCountVariant(() => {
  //   //   const count = []
  //   //   form.answers.forEach((item, index)=>{
  //   //     count.push(index);
  //   //   });
  //   //   return count;
  //   // })
  // } 

  
  console.log(countVariant);

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
  }

  const changeRadio = (event) => {
    // setTrueAnswers(+event.target.id);
    setForm({...form, "true_answers": [+event.target.id]})
  }

  const changeAnswers = async (event) => {
    setForm((form) => {
      const answers = [...form.answers];
      answers[event.target.name] = event.target.value;
      return { ...form, answers }
   });
  }


  // const {formArg: form, setFormArg: setForm} = formArg;
  // const [countVariant, setCountVariant] = useState([1,2]);
  // let [trueAnswers, setTrueAnswers] = useState(null);

  // const changeHandler = (event) => {
  //   // setTrueAnswers(event.target.id);
  //   setForm({...form, [event.target.name]: event.target.value})
  // }

  // const changeRadio = (event) => {
  //   // setForm({...form, "true_answers": [event.target.value]})
  //   // console.log(event.target.value);
  //   setTrueAnswers(event.target.id);
  //   console.log(event.target.value)
  //   setForm({...form, "true_answers": [event.target.value]})
  //   // console.log(trueAnswers)
  //   // setTrueAnswers(event.target.value);
  // }

  // const changeAnswers = async (event) => {
  //   // if(trueAnswers === answers[event.target.name]) {
  //   //   setTrueAnswers(()=>{
  //   //     return trueAnswers = event.target.value
  //   //   });
  //   // }

  //   // setAnswers(()=>{
  //   //   answers[event.target.name] = event.target.value;
  //   //   return answers;
  //   // });
  //   console.log(form.true_answers[0]);
  //   console.log(form.answers[event.target.name])
  //   console.log(trueAnswers, event.target.name)
  //   if(trueAnswers===event.target.name) {
  //     // console.log(1);
  //     setForm(() => {
  //       form.answers[event.target.name] = event.target.value;
  //       return {
  //         ...form,
  //         true_answers: [event.target.value]
  //       }
  //     });
  //   } else {
  //     setForm(()=>{
  //       form.answers[event.target.name] = event.target.value;
  //       return {
  //         ...form
  //       }
  //     })
  
  //   }

    // await setForm({...form, "answers": answers, "true_answers": [trueAnswers]});

    // if(form.true_answers[0] === form.answers[event.target.name]){
    //   setForm({...form, "true_answers": [event.target.value]});
    // }
    // setForm({...form, "answers": [...setForm.answers] });


    // if(trueAnswers === answers[event.target.name]) {
    //   console.log()
    //   setTrueAnswers(()=>{
    //     // console.log(event.target.value);
    //     // trueAnswers = event.target.value;
    //     return event.target.value;
    //   });
    // }

    // setAnswers(()=>{
    //   answers[event.target.name] = event.target.value;
    //   console.log(event.target.value);
    //   return answers;
    // });
    // console.log(trueAnswers);
    // console.log(answers)

    // setForm(()=>{
    //   form.answers = answers;
    //   form.true_answers = trueAnswers;
    //   return form;
    // });
    // console.log(form)

    // // setAnswers(()=>{
    // //   console.log(form.true_answers[0]);
    // //   console.log(answers[event.target.name])
    // //   if(trueAnswers === answers[event.target.name]){
    // //     console.log(event.target.value)
    // //     // setForm({...form, form["true_answers"]: [1]})
    // //     // setTrueAnswers(event.target.value)
    // //     setTrueAnswers(event.target.value)
    // //     console.log(trueAnswers)
    // //   }
    // //   answers[event.target.name] = event.target.value;
    // //   return answers;
    // // })

    // // console.log(form)

    // // setForm({...form, "answers": answers, "true_answers": trueAnswers});
    // // console.log(form)
    // // form.setForm({...form.form, [name]: [...form.form[name], event.target.value]})
  // }

  useEffect(() => {
    window.M.updateTextFields()
  }, [])


  const addVariant = () => {
    // setCountVariant([...countVariant, countVariant.length+1]);
    setCountVariant((countVariant) => 
      [...countVariant, countVariant.length+1]
    );
    console.log(countVariant)

    setForm((form) => {
      const answers = [...form.answers];
      const img_answers = [...form.img_answers];
      const photo_answers = [...form.photo_answers];

      answers.push("");
      img_answers.push("");
      photo_answers.push("");

      return { ...form, answers, img_answers, photo_answers};
   });
  }

  const changeComplexity = (event) => {
    setForm({...form, "complexity": +event.target.value});
  }

  const clearVariant = (event) => {
    console.log(event.target)
    setForm((form)=>{
      const answers = [...form.answers];
      const true_answers = [...form.true_answers];
      const img_answers = [...form.img_answers];
      const photo_answers = [...form.photo_answers];

      const index = true_answers.indexOf(+event.target.name);
      if(index !== -1) {
        true_answers.splice(index, 1);
      }
      answers.splice(+event.target.name, 1);
      photo_answers.splice(+event.target.name, 1);
      img_answers.splice(+event.target.name, 1);
      return {...form, answers, true_answers, img_answers, photo_answers}
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
    const radio = document.getElementById(`${event.target.name}`);
    radio.checked = false;

    console.log(countVariant)
  }

  const changeImgQuestion = async (event) => {
    const blob = new Blob([event.target.files[0]], {type:'image/jpg'});
    const buf = await blob.arrayBuffer()
    console.log(buf);
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function() {
      setForm((form) => {
        const img_question = btoa(reader.result);
        // console.log(Buffer(reader.result, 'base64'));
        // const img = Buffer
        const photo_question = reader.result;
        return {...form, img_question, photo_question};
      });
    }
  }

  const changeImgAnswers = (event) => {
    const blob = new Blob([event.target.files[0]], {type:'image/jpg'});
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function() {
      setForm((form) => {
        console.log(form)
        const img_answers = [...form.img_answers];
        const photo_answers = [...form.photo_answers];
        photo_answers[event.target.name] = reader.result;
        img_answers[event.target.name] = btoa(reader.result);
        return { ...form, img_answers, photo_answers};
     });
    }
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
    <input 
      type='file' 
      name='img_question' 
      onChange={changeImgQuestion}
    />
    <img src={form.photo_question}></img>

      {/* <input type='hidden' name='type' value='radio'/> */}

    {countVariant.map((item, index)=>{
      const check = form.true_answers.indexOf(index) !== -1 ? true : false;
      return(
      <div key={index}>
        <input 
          type='file' 
          name={index} 
          onChange={changeImgAnswers}
        />
        <img src={form.photo_answers[index]}></img>
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