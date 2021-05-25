import React, { useState, useEffect, useContext, useCallback  } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useMessage } from "../../hooks/messageHook";
import { useHttp } from "../../hooks/httpHooks";
import { Loader } from "../../components/Loader";
import { LoginPage } from "./LoginPage";

export const UserChangePage = () => {
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [user, setUser] = useState(null);
  const userId = useParams().userId;
  const message = useMessage();
  console.log(userId)

  const getUser = useCallback ( async () => {
    try {
      console.log(userId)
      const fetched = await request(`/api/users/me/admin/${userId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });

      setUser(fetched.user);
      
    } catch(error) {

    }
  }, [token, request, userId]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
    {!loading && user && <LoginPage form={user} setForm={setUser} ok={true} />}
    </>
  )
}