import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { UserInfo } from "../../components/UserInfo";

export const UserInfoPage = () => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [user, setUser] = useState(null);
  const userId = useParams().userId;
  console.log(userId)


  const getUser = useCallback ( async () => {
    try {
      const fetched = await request(`/api/users/me/admin/${userId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
    
console.log(fetched)
      setUser(fetched.user);
      
    } catch(error) {

    }
  }, [token, request, userId]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {!loading && user && <UserInfo user={user} />}
    </>
  );

}