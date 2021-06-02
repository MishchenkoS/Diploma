import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader"; 
import { AuthContext } from "../../context/authContext";
import { testAddContext } from "../../context/testAddContext"
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";
import { RadioTests } from "../../components/tests/RadioTest";
import { CheckTests } from "../../components/tests/CheckTests";
import { WriteTests } from "../../components/tests/WriteTests";

export const TestChangePage = () => {
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [test, setTest] = useState(null);
  // const [count, setCount] = useState(null);
  const [count, setCount] = useState(null);
  const testId = useParams().testId;
  const message = useMessage();
  console.log(testId)

  const getTest = useCallback ( async () => {
    try {
      const fetched = await request(`/api/tests/${testId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });

      console.log(fetched.test)

      setTest((test)=>{
        const true_answers = fetched.test.true_answers.map((item)=>{
          const index = fetched.test.answers.indexOf(item);
          return index;
        });

        setCount(()=>{
          if(fetched.test.answers.length !==0) {
            const cv = [];
            fetched.test.answers.forEach((item, index)=>{
              cv.push(index);
            });
            return cv
          } else {
            return [1,2];
          }
        })
        
        return {...fetched.test, true_answers};
      });

      console.log(test)


      // if(test.answers !== 0) {
      //   setCount((count) => {
      //     let cv = [];
      //     test.answers.forEach((item, index)=>{
      //       cv.push(index);
      //     });
      //     return cv;
      //   }) 
      // } else {
      //   setCount((count) => {
      //     return [1,2];
      //   });
      // }

      

    } catch(error) {
    }
  }, [token, request, testId]);

  useEffect(() => {
    getTest();
  }, [getTest]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  if(loading) {
    return <Loader></Loader>
  }

  const testChange = async () => {
    try {
      console.log("testid",testId)
      setTest((test)=>{
        const answers = [...test.answers];
        const true_answers = test.true_answers.map((item)=>{
          item = answers[item];
          return item;
        });
        return {...test, true_answers};
      });

      const true_answers = test.true_answers.map((item)=>{
        item = test.answers[item];
          return item;
      });

      const test_request = {...test, true_answers };

      if(!test_request.img_question) {

        console.log(2)
        delete test_request.img_question;
      }

      console.log(test_request);

      if(test_request.true_answers.length !== 0 
        && test_request.answers.length !== 0){
        
        const data = await request(`/api/tests/${testId}`, 'PATCH', {...test_request}, {
          Authorization: `Bearer ${token}`
        });
        message(data.message);
      } else {
        message("Не все поля заполнены");
        console.log(test_request)
      }


      console.log(test_request)
      window.location.href = `/tests/test/${testId}`;
    } catch (error) {
      
    }

    return false;
  }


  console.log(test)
  console.log(count)
  // let cv
  // if(test && count) {
  //   cv = [...count];
  // }
  // console.log(cv)
  return (
    <>
    <form action="" onSubmit={e => { e.preventDefault(); }}>
      {/* {!loading && test && {cv = }} */}
      {!loading && test && test.type==="RADIO" && 
        <RadioTests formArg={test} setFormArg={setTest} count={count} setCount={setCount}></RadioTests>}
      {!loading && test && test.type==="CHECK" && 
      <CheckTests formArg={test} setFormArg={setTest} count={count} setCount={setCount}></CheckTests>}
      {!loading && test && test.type==="WRITE" && 
      <WriteTests formArg={test} setFormArg={setTest}></WriteTests>}
      <div className='div-btn'>
      <button  
        type='submit' 
        onClick={testChange} 
        className="btn waves-effect waves-light indigo lighten-1 btn-add"
      >Изменить тест<i className="material-icons right">send</i></button>
      </div>
      </form>
    </>
  );
}