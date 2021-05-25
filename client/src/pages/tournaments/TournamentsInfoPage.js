import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { TournamentsInfo } from "../../components/TournamentsInfo";
import { useMessage } from "../../hooks/messageHook";

export const TournamentsInfoPage = () => {
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [tournaments, setTournaments] = useState([]);
  const message = useMessage();
  // const [games, setGames] = useState([]);

  const getTournaments = useCallback ( async () => {
    try {
      const fetched = await request('/api/tournaments/', "GET", null, {
        Authorization: `Bearer ${token}`
      });
      console.log(fetched)
      setTournaments(fetched);
      
    } catch(error) {

    }
  }, [token, request]);

  // const getGame = useCallback ( async (id) => {
  //   try {
  //     const fetched = await request(`/api/games/game/${id}`, "GET", null, {
  //       Authorization: `Bearer ${token}`
  //     });
      
  //     setGames(...games, fetched.game);
      
  //   } catch(error) {

  //   }
  // }, [token, request, getTournaments]);

  useEffect(() => {
    getTournaments();
    // tournaments.map((tournament) => {
    //   console.log(1)
    //   getGame(tournament.gameId);
    // })
  }, [getTournaments]);
  // console.log(games)

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
      {!loading && <TournamentsInfo tournaments={tournaments} />}
    </>
  );
}