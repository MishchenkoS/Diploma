import React, { useState, useContext, useEffect, useCallback } from "react"
import { Link, useParams } from "react-router-dom";
import { useHttp } from "../hooks/httpHooks";
import { useMessage } from "../hooks/messageHook";

import { AuthContext } from "../context/authContext"
export const HomePage = () => {
  const message = useMessage();
  const {loading, error, request, clearError} = useHttp();
  const {token, role} = useContext(AuthContext);
  const testId = useParams().testId;

  console.log(role)

  const [form, setForm] = useState({
    photo: null,
    testId
  })
  const formSubmit = async () => {
    console.log({...form.photo})
    const data =  await request(`/api/tests/photo`, 'POST', {photo: form.photo, testId}, {
      // 'Content-Type': 'form-data',
    });
    message(data.message);
  }

  const handleChange = (event) => {
    console.log(event.target.files[0]);
    console.log(event.target.files[0].name);
    const blob = new Blob([event.target.files[0]], {type:'image/jpg'});
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    // const formData = new FormData();
    // formData.append(event.target.files[0].name, event.target.files[0]);
    reader.onload = function() {
      setForm({
        img: `${reader.result}`,
        // img: formData,
        photo: blob,
        testId
      });
    }
    // console.log(formData)

    // setForm({
    //   photo: event.va
    // })
  }

  const getIMG = async () => {
    const data =  await request(`/api/tests/${testId}`, 'GET');
    console.log(data.photo)
    setForm({
      img: data.photo,
      testId
    });

    // message(data.message);
  }


  return (
    <>
    <div>HomePage</div>
    <form action="" onSubmit={e => { e.preventDefault(); }}>
      <input name="photo" accept=".png, .jpg" type="file" onChange={handleChange}></input>
      <img src={form.img}/>
      <button type='submit' onClick={formSubmit}>Submit</button>
    </form>
    <button onClick={getIMG}>Загрузить</button>
    </>
  );
}