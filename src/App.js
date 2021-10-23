import React, { createContext, useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/Login/PrivateRoute/PrivateRoute";
import Dashboard from "./Components/Dashboard/Dashboard";
import Users from "./Components/Users/Users";
import MakeAdmin from "./Components/MakeAdmin/MakeAdmin";
import NotFound from "./Components/NotFound/NotFound";

export const UserContext = createContext({});

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>

          <PrivateRoute exact path="/">
            <Dashboard></Dashboard>
          </PrivateRoute>

          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>

          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/users">
            <Users></Users>
          </Route>

          <Route path="/makeAdmin">
            <MakeAdmin></MakeAdmin>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
        <Footer></Footer>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
