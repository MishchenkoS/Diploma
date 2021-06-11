import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/users/LoginPage";
import { AuthPage } from "../pages/users/AuthPage";
import { UsersInfoPage } from "../pages/users/UsersInfoPage";
import { TestsInfoPage } from "../pages/tests/TestsInfoPage";
import { GamesInfoPage } from "../pages/games/GamesInfoPage";
import { TournamentsInfoPage } from "../pages/tournaments/TournamentsInfoPage";
import { TournamentInfoPage } from "../pages/tournaments/TournamentInfoPage";
import { TestPage } from "../pages/tests/TestInfoPage";
import { GamePage } from "../pages/games/GameInfoPage";
import { UserInfoPage } from "../pages/users/UserInfoPage";
import { TestAddPage } from "../pages/tests/TestAddPage";
import { GameAddPage } from "../pages/games/GameAddPage";
import { TestChangePage } from "../pages/tests/TestChangePage";
import { GameChangePage } from "../pages/games/GameChangePage";
import { UserChangePage } from "../pages/users/UserChangePage";
import { MyGamesPage } from "../pages/games/MyGamesPage";
import { MyTournamentsPage } from "../pages/tournaments/MyTournamentsPage";
import { OnlinePage } from "../pages/online/OnlinePage";
import { OnlineTournamentPage } from "../pages/online/OnlineTournamentPage";

export const useRoutes = (isAuthenticated, role) => {
  if(isAuthenticated && role === "ADMIN") {
    return (
      <Switch>
        <Route path="/" exact>
          <HomePage></HomePage>
        </Route>
        <Route exact path='/users'>
          <UsersInfoPage></UsersInfoPage>
        </Route>
        <Route exact path='/users/user/:userId'>
          <UserInfoPage></UserInfoPage>
        </Route>
        <Route exact path='/users/changeUser/:userId'>
          <UserChangePage></UserChangePage>
        </Route>

        <Route exact path='/tests'>
          <TestsInfoPage></TestsInfoPage>
        </Route>
        <Route exact path='/tests/test/:testId'>
          <TestPage></TestPage>
        </Route>
        <Route exact path='/tests/addTest'>
          <TestAddPage></TestAddPage>
        </Route>
        <Route exact path='/tests/changeTest/:testId'>
          <TestChangePage></TestChangePage>
        </Route>

        <Route exact path='/games'>
          <GamesInfoPage></GamesInfoPage>
        </Route>
        <Route exact path='/games/game/:gameId'>
          <GamePage></GamePage>
        </Route>
        <Route exact path='/games/addGame'>
          <GameAddPage></GameAddPage>
        </Route>
        <Route exact path='/games/changeGame/:gameId'>
          <GameChangePage></GameChangePage>
        </Route>

        <Route exact path='/tournaments'>
          <TournamentsInfoPage></TournamentsInfoPage>
        </Route>
        <Route exact path='/tournaments/:tournamentId'>
          <TournamentInfoPage></TournamentInfoPage>
        </Route>

        <Route exact path='/online'> 
          <OnlineTournamentPage></OnlineTournamentPage>
        </Route>
        <Route exact path='/online/:gameId'>
          <OnlineTournamentPage></OnlineTournamentPage>
        </Route>
        
        <Route path='/register'>
          <LoginPage></LoginPage> 
   </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if(isAuthenticated && (role === "LEADING" || role==="STUDENT")) {
    return (
      <Switch>
        <Route path="/" exact>
          <HomePage></HomePage>
        </Route>
        <Route exact path="/myGames">
          <MyGamesPage></MyGamesPage>
        </Route>
        <Route exact path='/games/game/:gameId'>
          <GamePage></GamePage>
        </Route>
        <Route exact path='/users/user/:userId'>
          <UserInfoPage></UserInfoPage>
        </Route>
        <Route exact path='/myTournaments'>
          <MyTournamentsPage></MyTournamentsPage>
        </Route>
        <Route exact path='/tournaments/:tournamentId'>
          <TournamentInfoPage></TournamentInfoPage>
        </Route>
        <Route exact path='/online'> 
          <OnlineTournamentPage></OnlineTournamentPage>
        </Route>
        <Route exact path='/online/:gameId'>
          <OnlineTournamentPage></OnlineTournamentPage>
        </Route>
        <Redirect to="/" />
      </Switch>
    );

  } 

  return (
    <Switch>
      <Route path="/" exact>
        <HomePage></HomePage>
        {/* <LoginPage></LoginPage> */}
      </Route>
      <Route exact path='/online'> 
          <OnlineTournamentPage></OnlineTournamentPage>
        </Route>
        <Route exact path='/online/:gameId'>
          <OnlineTournamentPage></OnlineTournamentPage>
        </Route>
      <Route path='/login'>
        <AuthPage></AuthPage>
      </Route>
      <Redirect to="/" />

    </Switch>
  );

}