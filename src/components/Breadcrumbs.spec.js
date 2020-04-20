import React from 'react';
import thunk from "redux-thunk";
import logger from "redux-logger";
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "../reducers/index";
import Breadcrumbs from './Breadcrumbs';


const store = createStore(rootReducer, applyMiddleware(thunk, logger));

describe('Breadcrumbs', () =>{
  it('Breadcrumbs render without crashing', () =>{
    render(
        <Provider store={store}>
            <Router>
               <Breadcrumbs />
            </Router>
        </Provider>
    )  
    })  
})