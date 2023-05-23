import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export const GamesInfo = ({ games }) => {
  const {role} = useContext(AuthContext);
  console.log(role);

  if (!games.length) {
    return (
    <>
    {role==="ADMIN" && <div className='div-btn'><Link to={`/games/addGame`} 
    className="btn waves-effect waves-light indigo lighten-1 btn-add"
    >Створити нову гру <i class="material-icons right">control_point</i></Link></div>}
    <p className="center">Игр пока нет</p>
    </>
    );
  }

  return (
    <>
    {role==="ADMIN" && <div className='div-btn'><Link to={`/games/addGame`} 
    className="btn waves-effect waves-light indigo lighten-1 btn-add"
    >Створити нову гру <i class="material-icons right">control_point</i></Link></div>}
    <div className='div-btn div-name-page'><h5>Список доступных игр</h5></div>
    <div className="collection">
      {games.map((game, index) => {
        return (
            <Link key={game._id} to={`/games/game/${game._id}`} className="collection-item ">
              <span>{ index + 1 } </span> { game.nameGame }  <i class="material-icons right">arrow_forward</i></ Link>
        );
      }) } 

    </div>
    </>
  );
}