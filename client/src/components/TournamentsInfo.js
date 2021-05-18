import React, { useState, useContext, useEffect, useCallback} from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../context/authContext";
// import { useHttp } from "../hooks/httpHooks";

export const TournamentsInfo = ({ tournaments}) => {

  if (!tournaments.length) {
    return <p className="center">Турниров пока нет</p>
  }

  // const {token} = useContext(AuthContext);
  // const {request, loading} = useHttp();
  // const [game, setGame] = useState(null);

  // const getGame = useCallback ( async (id) => {
  //   try {
  //     const fetched = await request(`/api/games/${id}`, "GET", null, {
  //       Authorization: `Bearer ${token}`
  //     });
  //     // console.log(fetched)
  //     setGame(fetched.game);
      
  //   } catch(error) {

  //   }
  // }, [token, request]);

  // useEffect(() => {
  //   tournaments.map((item) => {
  //     getGame(item.gameId)
  //   })


  // }, [getGame]);

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