import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import { BrowserRouter as Router } from "react-router-dom";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { Security } from '@okta/okta-react';

import "./sass/index.css";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Security issuer={`${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`}
            clientId={`${process.env.REACT_APP_OKTA_CLIENT_ID}`}
            redirectUri={window.location.origin+'/login'}
            pkce={true} >
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </Security>,
  document.getElementById("root")
);