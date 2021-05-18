import React from "react";
import { Link } from "react-router-dom";

export const UsersInfo = ({ users }) => {

  if (!users.length) {
    return <p className="center">Пользователей пока нет</p>
  }

  return (
    <div>
      {users.map((user, index) => {
        return (
          <div key={`${user._id}`}>
            <span>{ index + 1 } </span>
            <Link to={`/users/${user._id}`}>{ user.login }</ Link>
            
          </div>
        );
      }) }
    </div>
  );
}