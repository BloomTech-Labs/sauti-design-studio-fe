import React from 'react';
import thunk from "redux-thunk";
import logger from "redux-logger";
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "../reducers/index";
import UserMenu from './UserMenu';


const store = createStore(rootReducer, applyMiddleware(thunk, logger));

describe('UserMenu', () =>{
  it('UserMenu renders without crashing', () =>{
    render(
        <Provider store={store}>
            <Router>
               <UserMenu />
            </Router>
        </Provider>
    )  
    })  
})