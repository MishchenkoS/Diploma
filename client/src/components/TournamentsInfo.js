import React, { useState, useContext, useEffect, useCallback} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/httpHooks";
import { useMessage } from "../hooks/messageHook";
import { Loader } from "./Loader";
// import { AuthContext } from "../context/authContext";
// import { useHttp } from "../hooks/httpHooks";

export const TournamentsInfo = ({ tournaments}) => {
  const {loading, error, request, clearError} = useHttp();
  const {token} = useContext(AuthContext);
  const message = useMessage();
  const [game, setGame] = useState([]);

  if (!tournaments.length) {
    return <p className="center">Турниров пока нет</p>
  }

  console.log(tournaments)
  // const {token} = useContext(AuthContext);
  // const {request, loading} = useHttp();
  // useEffect(() => {
  //   message(error);
  //   clearError();
  // }, [error, message, clearError]);


  // const getGame = useCallback ( async (id) => {
  //   try {
  //     const fetched = await request(`/api/games/${id}`, "GET", null, {
  //       Authorization: `Bearer ${token}`
  //     });
  //     // console.log(fetched)
  //     setGame((game)=>[...game, fetched.game]);
      
  //   } catch(error) {

  //   }
  // }, [token, request, tournaments]);

  // useEffect(() => {
  //   tournaments.map((item) => {
  //     getGame(item.gameId)
  //   })
  // }, [getGame]);



  if(loading) {
    return <Loader></Loader>
  }


  return (
    <div>
      {tournaments.map((tournament, index) => {
        // getGame(tournament.gameId);
        return (
          <div key={`${tournament._id}`}>
            <span>{ index + 1 } </span>
            <Link to={`/tournaments/${tournament._id}`}>{ tournament._id }</ Link>
            
          </div>
        );
      }) }
    </div>
  );
}