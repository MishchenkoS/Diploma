import React from 'react';
import {NavLink} from 'react-router-dom';

export const Navbar = () => {

  return (
    <nav>
    <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
      <span className="brand-logo">Ф КТКТ НУЧП</span>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink to="/">Главная</NavLink></li>
        <li><a href="/login">Войти</a></li>
      </ul>
    </div>
  </nav>
  );
  

  
}