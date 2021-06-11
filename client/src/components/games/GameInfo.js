import React, { useContext, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";
import { Loader } from "../Loader";

// import { Link } from "react-router-dom";

export const GameInfo = (arg) => {
  //Loader
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const {game, players, leadings, rounds} = arg;

  const message = useMessage();

  console.log(game)

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);


  const getTest = (item) => {
    const testDOM = []
    for(let key in item) {
      testDOM.push(
        <Link to={`/tests/test/${item[key]._id}`} className="collection-item">
          <span>{item[key].question} </span>
        <i class="material-icons right">arrow_forward</i></Link>
        ) 
    }
    return testDOM;
  }

  // const getLeading = useCallback ( async (id) => {
  //   try {
  //     const fetched = await request(`/api/users/me/admin/${id}`, "GET", null, {
  //       Authorization: `Bearer ${token}`
  //     });
  //     // console.log(fetched)
  //     setLeadings([...leadings, fetched.user]);
      
  //   } catch(error) {

  //   }
  // }, [token, request]);

  // const getPlayers = useCallback ( async (id) => {
  //   console.log(id, 'id')
  //   try {
  //     const fetched = await request(`/api/users/me/admin/${id}`, "GET", null, {
  //       Authorization: `Bearer ${token}`
  //     });
  //     // console.log(fetched)
  //     setPlayers([...players, fetched.user]);
      
  //   } catch(error) {

  //   }
  // }, [token, request]);

  // const getRound = useCallback ( async (id) => {
  //   try {
  //     const fetched = await request(`/api/tests/${id}`, "GET", null, {
  //       Authorization: `Bearer ${token}`
  //     });
  //     console.log(fetched.test)
  //     const obj = {[id]:fetched.test}
  //     setRounds([...rounds, obj]);
      
  //   } catch(error) {

  //   }
  // }, [token, request]);

  const changeGame = () => {
    window.location.href = `/games/changeGame/${game._id}`;
  }

  // useEffect(() => {
  //   game.leadings.map((item) => {
  //     getLeading(item);
  //   });
  //   game.players.map((item, index) => {
  //     getPlayers(item);
  //   });

  //   game.rounds.map((item) => {
  //     console.log(item)
  //     for(let key in item) {
  //       getRound(key);
  //     }
  //   })

  // }, [getLeading, getPlayers, getRound]);

  
  console.log(rounds)
  console.log(game.rounds)

  // if(loading) {
  //   return <Loader></Loader>
  // }

  const deleteGame = async () => {
    try {
      const fetched = await request(`/api/games/game/${game._id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`
      });
      window.location.href = "/games";      
    } catch(error) {

    }
  }

  const startGame = async () => {
    window.location.href = `/online/${game._id}`;
  }

  console.log(players, 'players')
  console.log(rounds, 'rounds')

  return (
    <>
    <div className='div-btn div-name-page'><h5>Игра</h5></div>
  <table className="striped">
    <thead>
      <tr>
        <th>Название</th>
        <th>Тип</th>
        <th>Дата создания</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>{game.nameGame}</td>
      <td>{game.type}</td>
      <td>{new Date(game.created_date).toLocaleDateString()}</td>
      </tr>
    </tbody>

  </table>


  <table className="striped">
    <thead>
      <tr>
        <th>Ведущие</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      {leadings.map((item, index) => {
          return (
            <td key={`${index}`}>
              <Link to={`/users/user/${game.leadings[index]}`}>
              {item.login}
              </Link>
            </td>
          );
      })
      }
      </tr>
    </tbody>
  </table>

  <table className="striped">
  <thead>
      <tr>
        <th>Игроки</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      {/* <div> */}
      {players.map((item, index) => {
        console.log(item, 'item');
          return (
            <td key={`${index}`}>
            {/* <p> */}
              <Link to={`/users/user/${game.players[index]}`}>
              {item.login}
              </Link>
              {/* </p> */}
            </td>
          );
      })}
      {/* </div> */}
      </tr>
    </tbody>
  </table>


      {rounds.map((item, index) => {
        let testInRound = [<p >Раунд №{index+1}</p>];
        testInRound.push(<div className="collection">{getTest(item)}</div>)
        return testInRound;
      })}


   <div className='div-btn-game'>
      <button onClick={changeGame} className="btn waves-effect waves-light indigo lighten-1 btn-add ">
          Изменить игру<i class="material-icons right">edit</i></button>

        <button onClick={deleteGame} className="btn waves-effect waves-light indigo lighten-1 btn-add">
          Удалить игру<i class="material-icons right">delete</i></button>

        <button onClick={startGame} className="btn waves-effect waves-light indigo lighten-1 btn-add ">
          Начать игру<i class="material-icons right">people</i></button>

          </div>

      {/* <p>Название: {game.nameGame}</p>
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
      <p>{new Date(game.created_date).toLocaleDateString()}</p> */}
       


    </>
  );
}