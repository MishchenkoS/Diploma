import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { TournamentsInfo } from "../../components/tournaments/TournamentsInfo";
import { useMessage } from "../../hooks/messageHook";

export const MyTournamentsPage = () => {
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [tournaments, setTournaments] = useState([]);
  // const [games, setGames] = useState([]);
  const message = useMessage();

  const getTournaments = useCallback(async () => {
    try {
      const fetched = await request('/api/tournaments/myTournaments', "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setTournaments(fetched);
    } catch (error) {
    }
  }, [token, request]);

  // const getGames = useCallback(async (id) => {
  //   try {
  //     const fetched = await request(`/api/games/myGames/${id}`, "GET", null, {
  //       Authorization: `Bearer ${token}`
  //     });
  //     setGames((games)=>[...games, fetched]);
  //     console.log(fetched)
  //   } catch (error) {
  //   }
  // })

  useEffect(() => {
    getTournaments();

  }, [getTournaments])

  // useEffect(()=>{
  // //   if(tournaments.length) {
  // //     console.log(1)
  // //     tournaments.map((item)=>{
  // //       getGames(item.gameId);
  // //     })
  // //   }
  // }, []);



  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  if(loading) {
    return <Loader></Loader>
  }
  // console.log(games)
  return (
  <>
    {!loading && tournaments.length && <TournamentsInfo tournaments={tournaments}/>}
  </>);
}