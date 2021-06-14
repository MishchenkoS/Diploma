import React, {useCallback, useContext, useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";
// import { Link } from "react-router-dom";


export const Photo = () => {
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
    const fileForSend = document.querySelector('.file').files[0];
    console.log()
    const form_data = new FormData();
    form_data.append('photo', fileForSend);
    form_data.append('testId', form.testId);
    // const data =  await request(`/api/tests/photo`, 'POST', {photo: form.photo, testId: form.testId});
    const data = await fetch(`/api/tests/photo`, {
      method:"POST",
      body: form_data
    })
    message(data.message);
  }

  const handleChange = (event) => {
    // console.log(event.target.files[0]);
    // console.log(event.target.files[0].name);
    // const blob = new Blob([event.target.files[0]], {type:'image/jpg'});
    // let reader = new FileReader();
    // reader.readAsDataURL(blob);
    // reader.onload = function() {
    //   setForm({
    //     img: `${reader.result}`,
    //     // img: formData,
    //     photo: JSON.stringify({'photo': ""}),
    //     testId
    //   });
    // }
    const blob = new Blob([event.target.files[0]], {type:'image/jpg'});
    let reader = new FileReader();
    
    reader.readAsDataURL(blob);
    reader.onload = function() {
      setForm((form) => {
        const img = reader.result;
        // const img = Buffer
        const photo = JSON.stringify({'photo': reader.result});
        // console.log(Buffer(img_question, 'base64'));
        return {...form, img, photo};
      });
    }
  }

  const getIMG = async () => {
    const data =  await request(`/api/tests/${testId}`, 'GET');
    console.log(data.photo)
    // const photo = JSON.parse(data.photo);
    // console.log(atob(data.photo))
    // setForm({
    //   img: atob(data.photo),
    //   photo: atob(data.photo),
    //   testId
    // });
    const blob = new Blob([data.photo.data], {type:'image/jpg'});
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function() {
      setForm((form) => {
        const img = reader.result;
        console.log(reader.result)
        // const img = Buffer
        const photo = JSON.stringify({'photo': reader.result});
        // console.log(Buffer(img_question, 'base64'));
        return {...form, img, photo};
      });
    }

    // message(data.message);
  }

  return(<>
    <div>HomePage</div>
    <form action="" className="form" onSubmit={e => { e.preventDefault(); }}>
      <input name="photo" className="file" accept=".png, .jpg" type="file" onChange={handleChange}></input>
      <img src={form.img}/>
      <button type='submit' onClick={formSubmit}>Submit</button>
    </form>
    <button onClick={getIMG}>Загрузить</button>
    </>
  )
}