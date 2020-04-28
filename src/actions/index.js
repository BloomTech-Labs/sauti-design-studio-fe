import { axiosWithAuth } from "../components/utils/axiosWithAuth";

export const GET_CANVAS_BY_ID_START = "GET_CANVAS_BY_ID_START";
export const GET_CANVAS_BY_ID_SUCCESS = "GET_CANVAS_BY_ID_SUCCESS";
export const GET_CANVAS_BY_ID_FAILURE = "GET_CANVAS_BY_ID_FAILURE";

export const SAVE_CANVAS_START = "SAVE_CANVAS_START";
export const SAVE_CANVAS_SUCCESS = "SAVE_CANVAS_SUCCESS";
export const SAVE_CANVAS_FAILURE = "SAVE_CANVAS_FAILURE";

export const SAVE_TITLE_START = "SAVE_TITLE_START";
export const SAVE_TITLE_SUCCESS = "SAVE_TITLE_SUCCESS";
export const SAVE_TITLE_FAILURE = "SAVE_TITLE_FAILURE";

export const GET_TITLE_BY_ID_START = "GET_TITLE_BY_ID_START";
export const GET_TITLE_BY_ID_SUCCESS = "GET_TITLE_BY_ID_SUCCESS";
export const GET_TITLE_BY_ID_FAILURE = "GET_TITLE_BY_ID_FAILURE";

export const GET_PROJECTS_BY_ID_START = "GET_PROJECTS_BY_ID_START";
export const GET_PROJECTS_BY_ID_SUCCESS = "GET_PROJECTS_BY_ID_SUCCESS";
export const GET_PROJECTS_BY_ID_FAILURE = "GET_PROJECTS_BY_ID_FAILURE";

export const ADD_PROJECT_START = "ADD_PROJECT_START";
export const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";
export const ADD_PROJECT_FAILURE = "ADD_PROJECT_FAILURE";

export const SET_PROJECT_BY_ID_START = "SET_PROJECT_BY_ID_START";
export const SET_PROJECT_BY_ID_SUCCESS = "SET_PROJECT_BY_ID_SUCCESS";

export const DELETE_PROJECT_START = "DELETE_PROJECT_START";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAILURE = "DELETE_PROJECT_FAILURE";

export const SET_DELETE_STATE_SUCCESS = "SET_DELETE_STATE_SUCCESS";
export const SET_SIMULATE_STATE_SUCCESS = "SET_SIMULATE_STATE_SUCCESS";
export const UPDATE_CANVAS_WITHOUT_SAVE = "UPDATE_CANVAS_WITHOUT_SAVE";

export const PUBLISH_CANVAS_START = "PUBLISH_CANVAS_START"
export const PUBLISH_CANVAS_SUCCESS = "PUBLISH_CANVAS_SUCCESS"
export const PUBLISH_CANVAS_FAILURE = "PUBLISH_CANVAS_FAILURE"

export const SET_USER_BY_ID_START = "SET_USER_BY_ID_START";
export const SET_USER_BY_ID_SUCCESS = "SET_USER_BY_ID_SUCCESS";

let productionServer = process.env.REACT_APP_BE_API_URL;

export const getProjectsByUserId = (user_id) => dispatch => {
  dispatch({ type: GET_PROJECTS_BY_ID_START });
  let endpoint;
  if(productionServer){
    endpoint = `${productionServer}/projects/user/${user_id}`;
  }else{
    endpoint = `http://localhost:5000/projects/user/${user_id}`;
  } 
  axiosWithAuth()
    .get(
      endpoint,
    )
    .then(response => {
      dispatch({ type: GET_PROJECTS_BY_ID_SUCCESS, payload: response.data});
    })
    .catch(err => dispatch({ type: GET_PROJECTS_BY_ID_FAILURE, payload: err }))
    
};

export const setProjectId = ( project_id) => dispatch => {
  let promise = new Promise(function(resolve, reject) {
      resolve(dispatch({ type: SET_PROJECT_BY_ID_START }));
  });
  promise.then(function() {
    dispatch({ type: SET_PROJECT_BY_ID_SUCCESS, payload: project_id});
  });
};

export const setUserId = ( user_id, loggedIn) => dispatch => {
  let promise = new Promise(function(resolve, reject) {
      resolve(dispatch({ type: SET_USER_BY_ID_START }));
  });
  promise.then(function() {
    dispatch({ type: SET_USER_BY_ID_SUCCESS, payload: {user_id: user_id,loggedIn: loggedIn}});
  });
};

export const getCanvasById = (project_id1) => dispatch => {
  dispatch({ type: GET_CANVAS_BY_ID_START });
  let endpoint1;
  if(productionServer){
    endpoint1 = `${productionServer}/projects/${project_id1}`;
  }else{
    endpoint1 = `http://localhost:5000/projects/${project_id1}`;
  } 
  axiosWithAuth()
    .get(
      endpoint1,
    )
    .then(response => {
      dispatch({ type: GET_CANVAS_BY_ID_SUCCESS, payload: response.data});
    })
    .catch(err => dispatch({ type: GET_CANVAS_BY_ID_FAILURE, payload: err }));
};

export const getTitleById = (project_id1) => dispatch => {
  dispatch({ type: GET_TITLE_BY_ID_START });
  let endpoint1;
  if(productionServer){
    endpoint1 = `${productionServer}/projects/${project_id1}`;
  }else{
    endpoint1 = `http://localhost:5000/projects/${project_id1}`;
  } 
  axiosWithAuth()
    .get(
      endpoint1,
    )
    .then(response => {
      dispatch({ type: GET_TITLE_BY_ID_SUCCESS, payload: response.data});
    })
    .catch(err => dispatch({ type: GET_TITLE_BY_ID_FAILURE, payload: err }));
  };
  
export const saveCanvas = (objUpdate, project_id) => dispatch => {
  dispatch({ type: SAVE_CANVAS_START });
  let endpoint;
  if(productionServer){
    endpoint = `${productionServer}/projects/${project_id}`;
  }else{
    endpoint = `http://localhost:5000/projects/${project_id}`;
  } 
  axiosWithAuth()
    .put(
      endpoint,
      objUpdate
    )
    .then(response => {
      dispatch({
        type: SAVE_CANVAS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => dispatch({ type: SAVE_CANVAS_FAILURE, payload: err }));
};

export const publishCanvas = (objUpdate, project_id) => dispatch => {
  dispatch({ type: PUBLISH_CANVAS_START });
  let endpoint;
  if(productionServer){
    endpoint = `${productionServer}/projects/publish/${project_id}`;
  }else{
    endpoint = `http://localhost:5000/projects/publish/${project_id}`;
  } 
  axiosWithAuth()
    .post(endpoint,
      objUpdate
    ).then(response => {

      dispatch({
        type: PUBLISH_CANVAS_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => dispatch({ type: PUBLISH_CANVAS_FAILURE, payload: err }));
        
  }

export const saveTitle = (objUpdate, project_id) => dispatch => {
  dispatch({ type: SAVE_TITLE_START });
  let endpoint;
  if(productionServer){
    endpoint = `${productionServer}/projects/${project_id}`;
  }else{
    endpoint = `http://localhost:5000/projects/${project_id}`;
  } 
  axiosWithAuth()
    .put(
      endpoint,
      objUpdate
    ).then(response => {
      dispatch({
      type: SAVE_TITLE_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => dispatch({ type: SAVE_TITLE_FAILURE, payload: err }));
};

export const addProjectByUserId = (item) => dispatch => {
  dispatch({ type: ADD_PROJECT_START });
  let endpoint;
  if(productionServer){
    endpoint = `${productionServer}/projects/`;
  }else{
    endpoint = `http://localhost:5000/projects/`;
  }
  axiosWithAuth()
    .post(
      endpoint,
      item
    )
    .then(response => {
      dispatch({
        type: ADD_PROJECT_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => dispatch({ type: ADD_PROJECT_FAILURE, payload: err }));
};

export const setDeleteState = (delete_project) => dispatch => {
  dispatch({ type: SET_DELETE_STATE_SUCCESS, payload: !delete_project});
};

export const setSimulationState = (simulate_project) => dispatch => {
  dispatch({ type: SET_SIMULATE_STATE_SUCCESS, payload: !simulate_project});
};

export const updateCanvasWithoutSave = (json) => dispatch => {
  dispatch({ type: UPDATE_CANVAS_WITHOUT_SAVE, payload: json});
};

export const deleteProject = (project_id, props) => dispatch => {
  dispatch({ type: DELETE_PROJECT_START });
  let endpoint;
  if(productionServer){
    endpoint = `${productionServer}/projects/${project_id}`;
  }else{
    endpoint = `http://localhost:5000/projects/${project_id}`;
  }
  axiosWithAuth()
    .delete(
      endpoint,
    )
    .then(response => {
      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: response.data
      })
    })
    // gets project list after successfully deleting a project to update project list
    // because get projects by id was completing before deleting success
    // This makes get projects by id happen after a successful deletion
    .then(result => {
      dispatch({ type: GET_PROJECTS_BY_ID_START });
      let endpoint;
      if(productionServer){
        endpoint = `${productionServer}/projects/user/${props.user_id}`;
      }else{
        endpoint = `http://localhost:5000/projects/user/${props.user_id}`;
      } 
      axiosWithAuth()
        .get(
          endpoint,
        )
        .then(response => {
          dispatch({ type: GET_PROJECTS_BY_ID_SUCCESS, payload: response.data});
          props.history.push("/profile")
        })
        .catch(err => dispatch({ type: GET_PROJECTS_BY_ID_FAILURE, payload: err }))
    })
    .catch(err => dispatch({ type: DELETE_PROJECT_FAILURE, payload: err }));
};

