import React from "react";
import { Link } from "react-router-dom";

export const GamesInfo = ({ games }) => {

  if (!games.length) {
    return <p className="center">Игр пока нет</p>
  }

  return (
    <div>
      {games.map((game, index) => {
        return (
          <div key={`${game._id}`}>
            <span>{ index + 1 } </span>
            <Link to={`/games/game/${game._id}`}>{ game.nameGame }</ Link>
            
          </div>
        );
      }) }
    </div>
  );
}