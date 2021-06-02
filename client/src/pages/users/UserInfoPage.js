import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { UserInfo } from "../../components/users/UserInfo";
import { useMessage } from "../../hooks/messageHook";

export const UserInfoPage = () => {
  const {token, role} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [user, setUser] = useState(null);
  const userId = useParams().userId;
  const message = useMessage();
  console.log(userId)


  const getUser = useCallback ( async () => {
    try {
      if(role==="ADMIN") {
        const fetched = await request(`/api/users/me/admin/${userId}`, "GET", null, {
          Authorization: `Bearer ${token}`
        });
        setUser(fetched.user);
      } else {
        const fetched = await request(`/api/users/me/`, "GET", null, {
          Authorization: `Bearer ${token}`
        });
        setUser(fetched.user);
      }
    
      
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
      {!loading && user && <UserInfo user={user} />}
    </>
  );

}