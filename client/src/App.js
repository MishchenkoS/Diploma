import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import { useRoutes } from "./routes/AuthRoutes";
import { useAuth } from "./hooks/authHook";
import { AuthContext } from "./context/authContext";
import { NavbarAdmin } from "./components/navbar/NavbarAdmin";
import { NavbarLeading } from "./components/navbar/NavbarLeading";
import { NavbarUser } from "./components/navbar/NavbarUser";
import { Navbar } from "./components/navbar/Navbar";
import { Loader } from "./components/Loader"
import 'materialize-css';



function App() {
  const {token, login, logout, userId, role, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated, role);

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
