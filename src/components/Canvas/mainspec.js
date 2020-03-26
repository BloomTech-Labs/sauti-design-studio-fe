// import { connect } from "react-redux";
// import { saveCanvas, getCanvasById, deleteProject, setDeleteState, setSimulationState, saveTitle, getTitleById, publishCanvas } from "../../actions";
// import DeleteModal from "../DeleteModal.js";
// import SimulationModal from "../SimulationModal.js";
// import axios from "axios";

// import createEngine, {
//   DiagramModel,
//   DefaultNodeFactory,
//   DefaultLinkFactory,
//   DefaultLinkModel,
//   PointModel,
//   DeleteItemsAction
// } from "@projectstorm/react-diagrams";
// import {AdvancedLinkFactory} from "./custom-port-link-js/JSCustomPortAndLink"

// import { JSCustomNodeFactory } from "./custom-node-js/JSCustomNodeFactory";
// import { JSCustomNodeModel } from "./custom-node-js/JSCustomNodeModel";
// import { AdvancedPortFactory } from "./custom-port-link-js/JSCustomPortFactory";
// import { BodyWidget } from "./BodyWidget";

// import React from 'react';
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import { render } from '@testing-library/react';
// import { Provider } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
// import { createStore, applyMiddleware } from "redux";

// import rootReducer from "../../reducers/index.js";
// import * as Main from './main.js';


// const store = createStore(rootReducer, applyMiddleware(thunk, logger));

// describe('Main in canvas', () =>{
//   it('Main in canvas renders without crashing', () =>{
//     // GET ERROR -----> ---> Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
//     render(
//         <Provider store={store}>
//             <Router>
//                <Main />
//             </Router>
//         </Provider>
//     )  
//     })  
// })