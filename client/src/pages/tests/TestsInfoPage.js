import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { TestsInfo } from "../../components/tests/TestsInfo";
import { useMessage } from "../../hooks/messageHook";

export const TestsInfoPage = () => {
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [tests, setTests] = useState([]);
  const message = useMessage();

  const getTests = useCallback ( async () => {
    try {
      const fetched = await request('/api/tests/', "GET", null, {
        Authorization: `Bearer ${token}`
      });
      // console.log(fetched)
      setTests(fetched);
      
    } catch(error) {

    }
  }, [token, request]);

  useEffect(() => {
    getTests();
  }, [getTests]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {!loading && <TestsInfo tests={tests} />}
    </>
  );
}