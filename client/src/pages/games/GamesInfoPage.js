import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { GamesInfo } from "../../components/GamesInfo";
import { useMessage } from "../../hooks/messageHook";

export const GamesInfoPage = () => {
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [games, setGames] = useState([]);
  const message = useMessage();

  const getGames = useCallback ( async () => {
    try {
      const fetched = await request('/api/games/', "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setGames(fetched);
    } catch(error) {

    }
  }, [token, request]);

  useEffect(() => {
    getGames();
  }, [getGames]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {!loading && <GamesInfo games={games} />}
    </>
  );
}