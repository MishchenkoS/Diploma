import React, { useState, useContext, useEffect, useCallback} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";
import { Loader } from "../Loader";
// import { AuthContext } from "../context/authContext";
// import { useHttp } from "../hooks/httpHooks";

export const TournamentsInfo = ({ tournaments}) => {
  const {loading, error, request, clearError} = useHttp();
  const {token, role} = useContext(AuthContext);
  const message = useMessage();
  const [games, setGames] = useState([]);


  console.log(tournaments)


  const getGames = useCallback(async (id) => {
    try {
      if(role==="ADMIN") {
        const fetched = await request(`/api/games/game/${id}`, "GET", null, {
          Authorization: `Bearer ${token}`
        });
        setGames((games)=>[...games, fetched.game]);
      } else {

      const fetched = await request(`/api/games/myGames/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setGames((games)=>[...games, fetched.game]);
      console.log(fetched.game)
    }
    } catch (error) {
    }
  }, [token, request]);

  useEffect(()=>{
    console.log(2)
    tournaments.map((item)=>{
      console.log(item.gameId)
        getGames(item.gameId);
    })

  }, [tournaments])

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

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



  if(loading || !games) {
    return <Loader></Loader>
  }

  if (!tournaments.length) {
    return <p className="center">Турниров пока нет</p>
  }


  return (
    <>
    <div className='div-btn div-name-page'><h5>Список турниров</h5></div>
    {games.length === tournaments.length && <div className="collection">
      {tournaments.map((tournament, index) => {
        // getGame(tournament.gameId);
        console.log(games)
        return (
            <Link to={`/tournaments/${tournament._id}`} className="collection-item "> 
            <span>{ index + 1 } </span>
            <span> { games[index].nameGame }  </span>
            <span> {new Date(tournament.created_date).toLocaleDateString()} </span>
            <span> Статус: {tournament.status} </span>
            <i class="material-icons right">arrow_forward</i>
            </ Link>
          
        );
      }) }
    </div>}
    </>
  );
}