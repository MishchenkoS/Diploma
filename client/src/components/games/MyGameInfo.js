import React, { useContext, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { useMessage } from "../../hooks/messageHook";
import { Loader } from "../Loader";

// import { Link } from "react-router-dom";

export const MyGameInfo = ({ game }) => {
  //Loader
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const [leadings, setLeadings] = useState([]);
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);
  const message = useMessage();
  console.log(game)

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const getLeading = useCallback ( async (id) => {
    try {
      const fetched = await request(`/api/users/me/user/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLeadings([...leadings, fetched.user]);
    } catch(error) {
    }
  }, [token, request]);

  const getPlayers = useCallback ( async (id) => {
    try {
      const fetched = await request(`/api/users/me/user/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setPlayers([...players, fetched.user]);
      
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

  }, [getLeading, getPlayers]);


  if(loading) {
    return <Loader></Loader>
  }

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
              <p>
              {item.login}
              </p>
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
      {players.map((item, index) => {
          return (
            <td key={`${index}`}>
              <p>
              {item.login}
              </p>
            </td>
          );
      })}
      </tr>
    </tbody>
  </table>
 


    </>
  );
}