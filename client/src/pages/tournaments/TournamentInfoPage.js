import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { TournamentInfo } from "../../components/TournamentInfo";
import { useMessage } from "../../hooks/messageHook";

export const TournamentInfoPage = () => {
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [tournament, setTournament] = useState(null);
  const tournamentId = useParams().tournamentId;
  const message = useMessage();
  // console.log(tournamentId)

  const getTournament = useCallback ( async () => {
    try {
      const fetched = await request(`/api/tournaments/info/${tournamentId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
    
      // console.log(fetched) //Развернуть обьект
      setTournament(fetched.tournament);//?
      // console.log(tournament);
      
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
      {!loading && tournament && <TournamentInfo tournament={tournament} />}
    </>
  );

}