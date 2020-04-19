import React from 'react';
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import 'jest-dom/extend-expect';
import NavBar from './components/Navbar';

import rootReducer from "./reducers";
import App from './App';
// HEADS UP !!!!!
// React Test Renderer CAN NOT, repeat CAN NOT, 'currently'  work
// with eslint higher than 5.16.0, and jest 24.7.1
// so leave them alone if you like tests running
// test('Fake Test', () => {
//   expect(true).toBeTruthy();
// })
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

describe('<App />', () => {
    it('App renders without crashing', () =>{
        render(
            <Provider store={store}>
                <Router>
                   <App />
                </Router>
            </Provider>
        )  
      })  

  afterEach(cleanup)
})



