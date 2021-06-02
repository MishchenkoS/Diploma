import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";

export const OnlinePage = () => {
  const {loading, error, request, clearError} = useHttp();
  const [tournaments, setTournaments] = useState([]);

  const message = useMessage();

  const getGames = useCallback ( async () => {
    try {
      const fetched = await request('/api/tournaments/allStart', "GET", null);
      setTournaments(fetched);
      console.log(tournaments)
    } catch(error) {

    }
  }, [request]);

  
  useEffect(() => {
    getGames();
  }, [getGames]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  console.log(tournaments)

  if(loading) {
    return <Loader></Loader>
  }

  return (<>
  {tournaments.map(item=>{
    console.log(item);
    return <Link to={`/online/${item.gameId}`}>Hello{item.nameGame}</Link>
  })}

  </>);
}