import React, {useContext, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
  useEffect(()=>{
    const elems = document.querySelectorAll('.sidenav');
    const instances = window.M.Sidenav.init(elems, {});
  }, [])


  return (
    <>
    <nav>
    <div className="nav-wrapper indigo darken-4" style={{ padding: '0 2rem' }}>
      <span className="brand-logo">НУЧП</span>
      <a href="#" data-target="mobile-demo" className="sidenav-trigger burger_a">
          <i className="material-icons burger_i">menu</i>
        </a>
      <ul className="right hide-on-med-and-down">
        <li><NavLink to="/">Головна</NavLink></li>
        <li><NavLink to={`/online`}>Онлайн</NavLink></li>
        <li><a href="/login">Ввійти</a></li>
      </ul>
    </div>
  </nav>
  <ul  className="sidenav" id="mobile-demo">
        <li><NavLink to="/">Головна</NavLink></li>
        <li><NavLink to={`/online`}>Онлайн</NavLink></li>
        <li><a href="/login">Ввійти</a></li>
      </ul>
  </>
  );
  

  
}