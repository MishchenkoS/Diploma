import React, { useState, useContext, useEffect, useCallback } from "react"
import { useHttp } from "../hooks/httpHooks";
import { useMessage } from "../hooks/messageHook";

import { AuthContext } from "../context/authContext"
export const HomePage = () => {
  const message = useMessage();
  const {loading, error, request, clearError} = useHttp();
  const {token, role} = useContext(AuthContext);

  console.log(role)

  const [form, setForm] = useState({
    photo: null,
  })
  const formSubmit = async () => {
    const data =  await request(`/api/tests/photo`, 'POST', {...form}, {
      'Content-Type': 'form-data',
    });
    message(data.message);
  }

  const handleChange = (event) => {
    setForm({
      photo: URL.createObjectURL(event.target.files[0])
    });
  }


  return (
    <>
    <div>HomePage</div>
    <form action="" onSubmit={e => { e.preventDefault(); }}>
      <input name="photo" accept=".png, .jpg" type="file" onChange={handleChange}></input>
      <img src={form.photo}/>
      <button type='submit' onClick={formSubmit}>Submit</button>
    </form>
    </>
  );
}