import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/authContext';

export const NavbarLeading = () => {
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
    <>
    <nav>
      <div className="nav-wrapper indigo darken-4" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">КТКТ</span>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger burger_a">
          <i className="material-icons burger_i">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li><NavLink to="/">Главная</NavLink></li>
          <li><NavLink to={`/game/online`}>Онлайн</NavLink></li>
          <li><NavLink to="/games">Игры</NavLink></li>
          <li><NavLink to="/tournaments">Турниры</NavLink></li>
          <li><NavLink to="/users">Обо мне</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
    <ul className="sidenav" id="mobile-demo">
      <li><NavLink to="/">Главная</NavLink></li>
      <li><NavLink to={`/game/online`}>Онлайн</NavLink></li>
      <li><NavLink to="/games">Игры</NavLink></li>
      <li><NavLink to="/tournaments">Турниры</NavLink></li>
      <li><NavLink to="/users">Обо мне</NavLink></li>
      <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
    </ul>
   </>
  );



}