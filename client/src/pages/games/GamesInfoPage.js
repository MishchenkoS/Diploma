import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { GamesInfo } from "../../components/GamesInfo";

export const GamesInfoPage = () => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [games, setGames] = useState([]);

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

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {!loading && <GamesInfo games={games} />}
    </>
  );
}