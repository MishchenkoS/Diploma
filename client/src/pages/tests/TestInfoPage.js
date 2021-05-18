import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { TestInfo } from "../../components/TestInfo";

export const TestPage = () => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [test, setTest] = useState(null);
  const testId = useParams().testId;
  console.log(testId)

  const getTest = useCallback ( async () => {
    try {
      const fetched = await request(`/api/tests/${testId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
    

      setTest(fetched.test);
      
    } catch(error) {

    }
  }, [token, request, testId]);

  useEffect(() => {
    getTest();
  }, [getTest]);

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {!loading && test && <TestInfo test={test} />}
    </>
  );

}