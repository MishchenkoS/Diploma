import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { TestsInfo } from "../../components/TestsInfo";

export const TestsInfoPage = () => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [tests, setTests] = useState([]);

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

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {!loading && <TestsInfo tests={tests} />}
    </>
  );
}