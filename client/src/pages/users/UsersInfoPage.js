import React, {useContext, useState, useCallback, useEffect} from "react";
import { Loader } from "../../components/Loader"
import { UsersInfo } from "../../components/UsersInfo";
import { useHttp } from "../../hooks/httpHooks";
import { AuthContext } from "../../context/authContext";

export const UsersInfoPage = () => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [users, setUsers] = useState([]);

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

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {!loading && <UsersInfo users={users} />}
    </>
  );
}