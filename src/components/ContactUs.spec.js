import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { render } from '@testing-library/react';
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers/index";
import ContactUs from './ContactUs';


const store = createStore(rootReducer, applyMiddleware(thunk, logger));

describe('ContactUs', () =>{
  it('ContactUs renders without crashing', () =>{
    render(
        <Provider store={store}>
            <Router>
               <ContactUs />
            </Router>
        </Provider>
    )  
    })  
})