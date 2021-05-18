import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/authContext';

export const NavbarAuth = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('.sidenav');
  //   var instances = M.Sidenav.init(elems, options);
  // });
  
  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Ф КТКТ НУЧП</span>
        {/* <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a> */}
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/">Главная</NavLink></li>
          <li><NavLink to="/tests">Тесты</NavLink></li>
          <li><NavLink to="/games">Игры</NavLink></li>
          <li><NavLink to="/tournaments">Турниры</NavLink></li>
          <li><NavLink to="/users">Пользователи</NavLink></li>
          <li><NavLink to="/register">Регистрация</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  );



}