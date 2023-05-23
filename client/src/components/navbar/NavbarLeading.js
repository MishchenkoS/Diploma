import React, {useContext, useEffect} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from "../../context/authContext";

export const NavbarLeading = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

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
          <li><NavLink to="/myGames">Ігри</NavLink></li>
          <li><NavLink to="/myTournaments">Турнири</NavLink></li>
          <li><NavLink to={`/users/user/${auth.userId}`}>Про мене</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Вийти</a></li>
        </ul>
      </div>
    </nav>
    <ul className="sidenav" id="mobile-demo">
      <li><NavLink to="/">Головна</NavLink></li>
      <li><NavLink to={`/online`}>Онлайн</NavLink></li>
      <li><NavLink to="/myGames">Ігри</NavLink></li>
      <li><NavLink to="/tournaments">Турнири</NavLink></li>
      <li><NavLink to={`/users/user/${auth.userId}`}>Про мене</NavLink></li>
      <li><a href="/" onClick={logoutHandler}>Вийти</a></li>
    </ul>
   </>
  );



}