import React from "react";
import { Link } from "react-router-dom";

export const UsersInfo = ({ users }) => {

  if (!users.length) {
    return <p className="center">Користувачів поки немає</p>
  }

  return (
    <>
    <div className='div-btn div-name-page'><h5>Список користувачів</h5></div>
    <div className="collection">
      {users.map((user, index) => {
        return (
          // <div key={`${user._id}`}>
            <Link to={`/users/user/${user._id}`} className="collection-item ">
            <span>{ index + 1 } </span>
            { user.login }  <i class="material-icons right">arrow_forward</i></ Link>
            
          // </div>
        );
      }) }
    </div>
    </>
  );
}