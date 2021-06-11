import React from 'react';
import {NavLink} from 'react-router-dom';

export const Navbar = () => {

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
        <li><NavLink to={`/online`}>Онлайн</NavLink></li>
        <li><a href="/login">Войти</a></li>
      </ul>
    </div>
  </nav>
  <ul  className="sidenav" id="mobile-demo">
        <li><NavLink to="/">Главная</NavLink></li>
        <li><NavLink to={`/online`}>Онлайн</NavLink></li>
        <li><a href="/login">Войти</a></li>
      </ul>
  </>
  );
  

  
}