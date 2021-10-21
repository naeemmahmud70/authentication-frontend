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
import Home from "./Components/Home/Home";

export const UserContext = createContext({});

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>

          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/home">
            <Home></Home>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>

        </Switch>
        <Footer></Footer>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
