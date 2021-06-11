import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { TournamentInfo } from "../../components/tournaments/TournamentInfo";
import { MyTournamentInfo } from "../../components/tournaments/MyTournamentInfo";
import { useMessage } from "../../hooks/messageHook";

export const TournamentInfoPage = () => {
  const {token, role} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [tournament, setTournament] = useState(null);
  const [game, setGame] = useState(null);
  const [rounds, setRounds] = useState(null);
  const [leadings, setLeadings] = useState(null);
  const [players, setPlayers] = useState(null);
  const tournamentId = useParams().tournamentId;
  const message = useMessage();
  // console.log(tournamentId)

  const getTournament = useCallback ( async () => {
    try {
      const fetched = await request(`/api/tournaments/infoAll/${tournamentId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      console.log(fetched)
      setTournament(fetched.tournament);
      setGame(fetched.game);
      setRounds(fetched.rounds);
      setPlayers(fetched.players, 'fetched.players');
      setLeadings(fetched.leadings);
      
    } catch(error) {

    }
  }, [token, request, tournamentId]);

  useEffect(() => {
    getTournament();
  }, [getTournament]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  if(loading) {
    return <Loader></Loader>
  }
  // console.log(tournament)
  return (
    <>
      {!loading && tournament && game && rounds && players && leadings && role==="ADMIN" &&
      <TournamentInfo tournament={tournament} game={game} rounds={rounds} players={players} leadings={leadings}/>}
      {!loading && tournament && game && rounds && players && leadings && (role==="LEADING" || role==="STUDENT") &&
      <MyTournamentInfo tournament={tournament} game={game} rounds={rounds} players={players} leadings={leadings}/>}
    </>
  );

}