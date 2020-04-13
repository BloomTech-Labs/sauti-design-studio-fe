import React from "react";
import { Route } from "react-router-dom";

import Home from "./pages/Home.js";
import Profile from "./pages/Profile";
import AppBuilder from "./pages/AppBuilder.js";
import Login from "./pages/Login";
import LoginOkta from "./pages/LoginOkta"
import Error from "./pages/Error";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register"


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/workflows" component={AppBuilder}/>
      <Route path="/loginOkta" render={()=> <LoginOkta issuer={`${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`}/>} />
      <Route path="/login" component={Login} />
      <Route path="/register" render={()=> <Register issuer={`${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`}/>}/>
      <Route path="/error" component={Error} />
    </div>
  );
}

export default App;
