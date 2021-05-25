import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import { useRoutes } from "./routes/AuthRoutes";
import { useAuth } from "./hooks/authHook";
import { AuthContext } from "./context/authContext";
import { NavbarAdmin } from "./components/NavbarAdmin";
import { NavbarUser } from "./components/NavbarUser";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader"
import 'materialize-css';
import { NavbarLeading } from "./components/NavbarLeading";


function App() {
  const {token, login, logout, userId, role, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if(!ready) {
    return <Loader></Loader>
  }
  console.log(role);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, role, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && role==="ADMIN" && <NavbarAdmin></NavbarAdmin>}
        {isAuthenticated && role==="STUDENT" && <NavbarUser></NavbarUser>}
        {isAuthenticated && role==="LEADING" && <NavbarLeading></NavbarLeading>}
        {!isAuthenticated && <Navbar></Navbar>}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
