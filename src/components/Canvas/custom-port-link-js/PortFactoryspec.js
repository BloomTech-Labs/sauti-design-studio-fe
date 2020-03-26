// import React from 'react';
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import { render } from '@testing-library/react';
// import { Provider } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
// import { createStore, applyMiddleware } from "redux";

// import rootReducer from "../../../reducers/index";
// import {AdvancedPortFactory} from './JSCustomPortFactory';


// const store = createStore(rootReducer, applyMiddleware(thunk, logger));

// describe('Swatch', () =>{
//   it('Swatch renders without crashing', () =>{

//     //Error: Uncaught [TypeError: Class constructor AdvancedPortFactory cannot be invoked without 'new']

//     render(
//         <Provider store={store}>
//             <Router>
//                <AdvancedPortFactory />
//             </Router>
//         </Provider>
//     )  
//     })  
// })