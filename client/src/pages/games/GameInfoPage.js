import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { GameInfo } from "../../components/games/GameInfo";
import { MyGameInfo } from "../../components/games/MyGameInfo";
import { useMessage } from "../../hooks/messageHook";

export const GamePage = () => {
  const {token, role} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [game, setGame] = useState(null);
  const [leadings, setLeadings] = useState(null);
  const [players, setPlayers] = useState(null);
  const [rounds, setRounds] = useState(null);
  const gameId = useParams().gameId;
  console.log(gameId)

  const message = useMessage();

  const getGame = useCallback ( async () => {
    try {
      const fetched = await request(`/api/games/gameAll/${gameId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      console.log(fetched, 'fetched');
      setGame(fetched.game);
      setLeadings(fetched.leadings);
      setPlayers(fetched.players);
      setRounds(fetched.roundsGame);

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
      {!loading && game && players && leadings && rounds && role==="ADMIN" && 
      <GameInfo game={game} players={players} leadings={leadings} rounds={rounds} />}
      {!loading && game && players && leadings && (role==="LEADING" || role==="STUDENT") && 
      <MyGameInfo game={game} players={players} leadings={leadings} rounds={rounds}  />}
    </>
  );
}