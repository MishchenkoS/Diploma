import React, { useState, useEffect, useContext, useCallback  } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useMessage } from "../../hooks/messageHook";
import { useHttp } from "../../hooks/httpHooks";
import { Loader } from "../../components/Loader";
import { GameAddPage } from "./GameAddPage";

export const GameChangePage = () => {
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [game, setGame] = useState(null);
  const gameId = useParams().gameId;
  const message = useMessage();

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

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {!loading && game && <GameAddPage form={game} setForm={setGame} ok={true} />}
    </>
  );
}