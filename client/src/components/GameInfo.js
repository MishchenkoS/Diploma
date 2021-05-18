import React, { useContext, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/httpHooks";
import { Loader } from "../components/Loader";

// import { Link } from "react-router-dom";

export const GameInfo = ({ game }) => {
  //Loader
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [leadings, setLeadings] = useState([]);
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);

  const getLeading = useCallback ( async (id) => {
    try {
      const fetched = await request(`/api/users/me/admin/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      // console.log(fetched)
      setLeadings([...leadings, fetched.user]);
      
    } catch(error) {

    }
  }, [token, request]);

  const getPlayers = useCallback ( async (id) => {
    try {
      const fetched = await request(`/api/users/me/admin/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      // console.log(fetched)
      setPlayers([...players, fetched.user]);
      
    } catch(error) {

    }
  }, [token, request]);

  const getRound = useCallback ( async (id) => {
    try {
      const fetched = await request(`/api/tests/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      console.log(fetched.test)
      const obj = {[id]:fetched.test}
      setRounds([...rounds, obj]);
      
    } catch(error) {

    }
  }, [token, request]);


  useEffect(() => {
    game.leadings.map((item) => {
      getLeading(item);
    });
    game.players.map((item, index) => {
      getPlayers(item);
    });
    game.rounds.map((item) => {
      for(let key in item) {
        getRound(key);
      }
    })
  }, [getLeading, getPlayers, getRound]);

  
  console.log(rounds)
  console.log(game.rounds)

  if(loading) {
    return <Loader></Loader>
  }

  return (
    <>
      <p>Название: {game.nameGame}</p>
      <p>Тип: {game.type}</p>
      <p>Ведущие: 
      {leadings.map((item, index) => {
          return (
            <li key={`${index}`}>
              <Link to={`/users/${game.leadings[index]}`}>
              {item.login}
              </Link>
            </li>
          );
      })
      }
      </p>
      <p>Игроки: 
      {players.map((item, index) => {
          return (
            <li key={`${index}`}>
              <Link to={`/users/${game.players[index]}`}>
              {item.login}
              </Link>
            </li>
          );
      })
      }
      </p>
      <p>Раунды:
        {rounds.map((item, index) => {
          let testInRound = 
          [<p key={`${index}`}>Раунд №{index+1}:</p>]
          
        for(let key in item) {
          testInRound.push( <li key={`${index}${key}`}><Link to={`/tests/${item[key]._id}`}>{item[key].question}</Link></li>) 
        }
        return testInRound;
      })}
      </p>

      


    </>
  );
}