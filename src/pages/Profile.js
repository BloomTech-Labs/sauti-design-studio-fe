import React from 'react';
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getProjectsByUserId,addProjectByUserId,setProjectId,setUserId,deleteProject, setDeleteState } from "../actions";

import DeleteModal from "../components/DeleteModal";

import Navbar from '../components/Navbar';
import ProjectBar from '../components/ProjectBar.js';
import Footer from '../components/Footer.js';

class Profile extends React.Component {
  state={
    // local State Projects
    projects: null
  }

  componentDidMount(){
    let user_id = localStorage.getItem("id")
    // On page load request users projects 
    if(user_id){
      if(this.props.user_id !== null && (this.props.user_id === user_id)){
        this.props.getProjectsByUserId(this.props.user_id);
      }
      else if(this.props.user_id !== user_id){
        this.props.setUserId(user_id, true);
      }
    }else if(!user_id || this.props.loggedIn === false){
      this.props.history.push("/");
    }
  }

  componentDidUpdate(prevProps, prevState){
    let user_id = localStorage.getItem("id")

    if(user_id){
      // On Create New Project: request projects
      if(this.props.added_project !== prevProps.added_project && !this.props.added_project){
        this.props.getProjectsByUserId(this.props.user_id);
      }
      // Update project state on modification of props projects
      else if(this.props.projects !== prevProps.projects && !this.props.fetching){
          this.setState({
            ...this.state,
            projects: this.props.projects
          });
      }
      // On selection of a project an ID is place on redux state and then update routing to project page
      // else if(this.props.fetchingProjectId !== prevProps.fetchingProjectId && this.props.fetchingProjectId === false){
      //   this.props.history.push("/workflows");
      // }
      if(this.props.user_id !== prevProps.user_id){
        this.props.getProjectsByUserId(this.props.user_id);
      }
    }else{
      this.props.history.push("/");
    }
  }
  
  // Create New Project
  addProject = (obj) => {
    let {project_title, graph_json, user_id, initial_node_id} = obj;
    let projectsArray = this.state.projects || [];
    projectsArray.push({
      add: "Adding Project"
    });
    this.setState({
      ...this.state,
      projects: projectsArray
    });
    this.props.addProjectByUserId(
      {
        project_title,
        graph_json,
        user_id,
        initial_node_id
      }
    )
  }

  render(){
      return (
        <>
        <DeleteModal props={this.props} history={this.props.history}/>
        <Navbar/>
        <ProjectBar />
        <div className="profile-page-container">
          <section className="projects-section">
            {
              (this.props.fetching || this.props.projects === null || this.state.projects === null)?(
                // On Loading Provide Temporary Loading Screen 
                <p>Loading Projects...</p>
                ):(
                // Loading False
                <div className="projects-list">
                  {this.state.projects.map(project => {
                    if(project.add !== undefined){
                      return <div className="title-container">
                        <h3>{ project.add }</h3>
                      </div>
                    }else{
                    return <div 
                    className="project"
                    key={project.id}
                    
                    >
                    <div className="title-container">
                      <h3>{ project.project_title }</h3>
                      <p>Project Staus</p>
                      <p># of cards</p>
                      <p>Last edit date</p>
                      <p>API requests 119/225</p>
                      <p>API bar graph</p>
                      <p>Use period</p>
                      <div className='project-card-buttons'>

                        <button onClick={async () => {
                          await this.props.setProjectId(project.id)
                          await this.props.setDeleteState(this.props.delete_project)
                        }}>Delete</button>

                        <button><span className='emphasize' onClick={
                      async ()=> {await this.props.setProjectId(project.id)
                      this.props.history.push("/workflows")}
                    }>Edit</span></button>
                      </div>
                    </div>
                  </div>
                    }
                  })}
                  <div 
                    //this is the add project button 
                    className="add-button-container title-container"
                    title="Add Project"
                    onClick={()=>this.addProject(
                      {
                        project_title: "Enter Title..." || this.state.project_title,
                        graph_json: null,
                        user_id: this.props.user_id,
                        initial_node_id: null
                      }
                    )}
                  >
                    <i className="fas fa-plus-circle"></i>
                  </div>
                </div>
              )
            }
            
          </section>
        </div>
        <Footer />
      </>
    )
  }
}

// Global Redux State
const mapStateToProps = state => ({
  user_id: state.user_id,
  projects: state.projects,
  project_id: state.project_id,
  added_project: state.added_project,
  project_title: state.project_title,
  graph_json: state.graph_json,
  fetching: state.fetching,
  error: state.error,
  loggedIn: state.loggedIn,
  fetchingProjectId: state.fetchingProjectId,
  delete_project: state.delete_project
});

// Connecting State and Rdux Reducer Methods
export default withRouter(connect(mapStateToProps,
  { getProjectsByUserId, addProjectByUserId, setProjectId, deleteProject, setDeleteState, setUserId }
)((Profile))) 
