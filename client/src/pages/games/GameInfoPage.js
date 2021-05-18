import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { GameInfo } from "../../components/GameInfo";

export const GamePage = () => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [game, setGame] = useState(null);
  const gameId = useParams().gameId;
  console.log(gameId)

  const getGame = useCallback ( async () => {
    try {
      const fetched = await request(`/api/games/game/${gameId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });

      setGame(fetched.game);
      
    } catch(error) {

    }
  }, [token, request, gameId]);

  useEffect(() => {
    getGame();
  }, [getGame]);

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {!loading && game && <GameInfo game={game} />}
    </>
  );
}