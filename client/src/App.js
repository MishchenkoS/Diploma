import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import { useRoutes } from "./routes/AuthRoutes";
import { useAuth } from "./hooks/authHook";
import { AuthContext } from "./context/authContext";
import { NavbarAuth } from "./components/NavbarAuth";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader"
import 'materialize-css';


function App() {
  const {token, login, logout, userId, role, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if(!ready) {
    return <Loader></Loader>
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, role, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <NavbarAuth></NavbarAuth>}
        {!isAuthenticated && <Navbar></Navbar>}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
