// HEADS UP !!!!!
// React Test Renderer CAN NOT, repeat CAN NOT, 'currently'  work
// with eslint higher than 5.16.0, and jest 24.7.1
// so leave them alone if you like tests running
// test('Fake Test', () => {
//   expect(true).toBeTruthy();
// })
import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react';
// import 'jest-dom/extend-expect';
import { BrowserRouter as Router } from "react-router-dom";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import NavBar from './components/Navbar';
const store = createStore(rootReducer, applyMiddleware(thunk, logger));
describe('<Navbar />', () => {
  // it('should render SAUTI DESIGN STUDIO', () => {
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <Router>
  //         <NavBar />
  //       </Router>
  //     </Provider>
  //   );
  //   expect(getByText(/SAUTI DESIGN STUDIO/i)).toBeInTheDocument();
  // })
  // it('should render login', () => {
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <Router>
  //         <NavBar />
  //       </Router>
  //     </Provider>
  //   );
  //   expect(getByText(/Login/i)).toBeInTheDocument();
  // })
  it('should render google button', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );
    const loginButton = getByText(/Login/i);
    await wait(()=> fireEvent.click(loginButton))
    await wait(()=> expect(getByText(/Google/i)))
    getByText(/Google/i)
    expect(getByText(/Google/i)).toBeInTheDocument();
  })
})
