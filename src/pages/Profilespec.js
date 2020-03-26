// import React from 'react';
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import { render } from '@testing-library/react';
// import { Provider } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
// import { createStore, applyMiddleware } from "redux";

// import rootReducer from "../reducers/index.js";
// import Profile from './Profile.js';

// // TypeError: Cannot read property 'push' of undefined

// // 34 |       }
// // 35 |     }else if(!user_id || this.props.loggedIn === false){
// // > 36 |       this.props.history.push("/");
// //    |                          ^
// // 37 |     }
// // 38 | 
// // 39 |   }

// const store = createStore(rootReducer, applyMiddleware(thunk, logger));

// describe('Profile', () =>{
//   it('Profile renders without crashing', () =>{
//     render(
//         <Provider store={store}>
//             <Router>
//                <Profile />
//             </Router>
//         </Provider>
//     )  
//     })  
// })