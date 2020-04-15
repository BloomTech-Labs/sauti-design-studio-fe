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

  it('should render google button after clicking login', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    const loginButton = screen.getByText(/Sign in/i);
    await waitFor(()=> fireEvent.click(loginButton))
    await waitFor(()=> expect(screen.getByText('Login with Google')))
    getByText('Login with Google')
    expect(screen.getByText("Login with Google"));
    // code below for additional click -- cannot test oauth page
    // const googleButton = getByText('Login with Google');
    // await waitFor(()=> fireEvent.click(googleButton))
    // await waitFor(()=> expect(screen.getByText("Sign in with Google")))
    // getByText('Sign in with Google')
    // expect(screen.getByText("Sign in with Google"));
  })
  afterEach(cleanup)
})



