import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";


function App() {
  return (
    <Router>
       <Header></Header>
      <Switch>
       
        <Route path="/login">
          <Login></Login>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
