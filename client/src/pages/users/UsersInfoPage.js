import React, {useContext, useState, useCallback, useEffect} from "react";
import { Loader } from "../../components/Loader"
import { UsersInfo } from "../../components/users/UsersInfo";
import { useHttp } from "../../hooks/httpHooks";
import { AuthContext } from "../../context/authContext";
import { useMessage } from "../../hooks/messageHook";

export const UsersInfoPage = () => {
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [users, setUsers] = useState([]);
  const message = useMessage();

  const getUsers = useCallback ( async () => {
    try {
      const fetched = await request('/api/users/me/admin', "GET", null, {
        Authorization: `Bearer ${token}`
      });
      console.log(fetched)
      setUsers(fetched);
      
    } catch(error) {

    }
  }, [token, request]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {!loading && <UsersInfo users={users} />}
    </>
  );
}