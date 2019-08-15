import * as React from "react";
import Trashcan from "../../images/icons/trash.png";
import DocSettings from "../../images/icons/docSettings.png";
import Gear from "../../images/icons/gear.png";
import Lock from "../../images/icons/lock.png";
import PaintBucket from "../../images/icons/paintBucket.png";
import Plus from "../../images/icons/plus.png";
import ZoomIn from "../../images/icons/zoomIn.png";
import ZoomOut from "../../images/icons/zoomOut.png";
import { connect } from "react-redux";
import { saveCanvas, getCanvasById, deleteProject, setDeleteState } from "../../actions";
import DeleteModal from "../DeleteModal.js";
import { Redirect } from 'react-router'

import createEngine, {
  DiagramModel,
  DefaultNodeFactory,
  DefaultLinkFactory,
  DefaultLinkModel,
  PointModel
} from "@projectstorm/react-diagrams";
import { JSCustomNodeFactory } from "./custom-node-js/JSCustomNodeFactory";
import { JSCustomNodeModel } from "./custom-node-js/JSCustomNodeModel";
import { BodyWidget } from "./BodyWidget";

import Swatches from '../Swatches/Swatches';

// create an instance of the engine
let engine = createEngine();

// register the two engines
engine.getNodeFactories().registerFactory(new JSCustomNodeFactory());
engine.getNodeFactories().registerFactory(new DefaultNodeFactory());
engine.getLinkFactories().registerFactory(new DefaultLinkFactory());

// create a diagram model
const model = new DiagramModel();

// install the model into the engine
engine.setDiagramModel(model);

//####################################################
// ------------- SERIALIZING ------------------
let str = JSON.stringify(model.serializeDiagram());

// // !------------- DESERIALIZING ----------------
let cerealBox = new DiagramModel();
cerealBox.deSerializeDiagram(JSON.parse(str), engine);
engine.setDiagramModel(cerealBox);
// cerealBox.serializeDiagram();

class CustomExample extends React.Component {
  constructor(props){
    super(props);
    this.ENTER_KEY = 13;
    this.state = {
      selectedColor: "#B80000",
      canvas_stop: false,
      project_title: null,
      project_title_class: false,
      delete_project: false
    }
  }

  componentDidMount(){
    this.getCanvas();
  }

  componentDidUpdate(prevProps, prevState){
    // If canvas is Saved retrieve new canvas
    if(this.props.saving_canvas !== prevProps.saving_canvas && this.props.saving_canvas === false){
      this.getCanvas();
    }

    // If delete_project is called and returned without deletion
    // if(this.props.delete_project !== prevProps.delete_project && this.props.delete_project === false){
    //   setTimeout(()=>{
    //     cerealBox.deSerializeDiagram(this.props.graph_json, engine);
    //     engine.setDiagramModel(cerealBox);
    //     engine.repaintCanvas();
    //   },0);
    // }

    // Handle Project title update on initial load
    if(((this.state.project_title !== this.props.project_title && this.state.project_title === null) || prevProps.project_title !== this.props.project_title)){
        this.setState({
          ...this.state,
          project_title: this.props.project_title
        });
      }

    // Handle Project canvas update on initial load
    if(this.props.fetching !== prevProps.fetching && this.props.fetching === false && this.props.graph_json !== null){
      console.log("if ---------- 1");
      setTimeout(()=>{
        cerealBox = new DiagramModel();
        cerealBox.deSerializeDiagram(this.props.graph_json, engine);
        engine.setDiagramModel(cerealBox);
        engine.repaintCanvas();
      },0);
    }
    // else{
    //   engine.setDiagramModel(model);
    //   engine.repaintCanvas();
    // }
        // Handle Project canvas update on initial load
        if(this.props.project_id !== prevProps.project_id && this.props.fetching !== prevProps.fetching && this.props.fetching === false && this.props.graph_json !== null){
          console.log("if ---------- 1");
          setTimeout(()=>{
            cerealBox = new DiagramModel();
            cerealBox.deSerializeDiagram(this.props.graph_json, engine);
            engine.setDiagramModel(cerealBox);
            engine.repaintCanvas();
          },0);
        }

        // Handle Project canvas update on initial load
        if(this.props.project_id !== prevProps.project_id && this.props.fetching !== prevProps.fetching && this.props.fetching === false && this.props.graph_json !== null && this.props.graph_json !== prevProps.graph_json){
          console.log("if ---------- 1");
          setTimeout(()=>{
            cerealBox = new DiagramModel();
            cerealBox.deSerializeDiagram(this.props.graph_json, engine);
            engine.setDiagramModel(cerealBox);
            engine.repaintCanvas();
          },0);
        }

        if(this.props.graph_json !== null && this.props.graph_json !== prevProps.graph_json){
          console.log("if ---------- 1");
          setTimeout(()=>{
            cerealBox = new DiagramModel();
            cerealBox.deSerializeDiagram(this.props.graph_json, engine);
            engine.setDiagramModel(cerealBox);
            engine.repaintCanvas();
          },0);
        }

        if(this.props.graph_json === null){
          cerealBox = new DiagramModel();
          engine.setDiagramModel(cerealBox);
          engine.repaintCanvas();
        }

  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleEdit = (name) => {
    if (name === "project_title") {
      this.setState({
        ...this.state,
        project_title_class: !this.state.project_title_class
      });
  }
  }

  handleKeyDown = (event) => {
    if (event.which === this.ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  handleSubmit = (event) => {
  if (event.target.name === "project_title") {
    this.setState({
      ...this.state,
      project_title: this.state[event.target.name],
      project_title_class: !this.state.project_title_class
    });
    // this.props.node.description = this.state[event.target.name];
    this.updateTitle();
  }
  }

  updateTitle = () => {
    const objUpdate = {
        "project_title": this.state.project_title,
    }
    this.props.saveCanvas(objUpdate, this.props.project_id);
  }

  updateSelectedColor = selectedColor => {
    let selectedItems = cerealBox.getSelectedItems();
    this.setState({selectedColor}, () => this.changeColor(selectedItems))
  };

  createNode = () => {
    let newItem = new JSCustomNodeModel();
    newItem.nameNode("Enter Node Name...");
    newItem.provideDescription("Enter Description...");
    newItem.setPosition(0, 0);
    cerealBox.addNode(newItem);
    engine.repaintCanvas();
  };

  deleteItem = (item) => {
    // Checks if a node or wire is selected
    if (item.length !== 0) {
      if (item[0] instanceof JSCustomNodeModel) {
        // Delete Nodes
        item[0].removePorts();
        cerealBox.removeNode(item[0]);
        engine.repaintCanvas();
      } else if (item[0] instanceof PointModel) {
        cerealBox.removeLink(item[0].parent);
        engine.repaintCanvas();
      } else if (item[0] instanceof DefaultLinkModel) {
        // Delete Links
        cerealBox.removeLink(item[0]);
        engine.repaintCanvas();
      }
    } 
  };

  changeColor = (item) => {
    // Checks if a node or wire is selected
    // console.log(item[0])
    // console.log('line 78: item[0].constructor.name', item[0].constructor.name)
    if (item.length !== 0) {
      if (item[0] instanceof JSCustomNodeModel) {
        // console.log('JSCustomNodeModel detected');
        // Change Node Color
        // item[0].removePorts();
        // engine.repaintCanvas();
      } else if (item[0] instanceof PointModel) {
        // console.log('PointModel detected');
        // Change Link Color
        // console.log("----");
        item[0].parent.setColor(this.state.selectedColor);
        engine.repaintCanvas();
      } else if (item[0] instanceof DefaultLinkModel) {
        // console.log('Link detected');
        // Change Link Color
        item[0].setColor("#FCCB00");
        engine.repaintCanvas();
      }
    } 
  };

  zoomOut = () => {
    let zoomLevel = cerealBox.getZoomLevel()
    console.log(zoomLevel);
    zoomLevel += 10;
    cerealBox.setZoomLevel(zoomLevel);
    cerealBox.fireEvent({ zoomLevel }, 'zoomUpdated');
    engine.repaintCanvas();
  };

  zoomIn = () => {
    let zoomLevel = cerealBox.getZoomLevel()
    console.log(zoomLevel);
    zoomLevel -= 10;
    cerealBox.setZoomLevel(zoomLevel);
    cerealBox.fireEvent({ zoomLevel }, 'zoomUpdated');
    engine.repaintCanvas();
  };

  getCanvas = () => {
    this.props.getCanvasById(this.props.project_id);
  }

  saveCanvas1 = (event) => {
    event.preventDefault();
    let savedCanvas = cerealBox.serializeDiagram();
    console.log("savedCanvas------------", savedCanvas);
    let objUpdate;
    if(savedCanvas.nodes.length === 0){
      objUpdate = {
        project_title: this.props.project_title,
        graph_json: savedCanvas,
        user_id: this.props.user_id,
        initial_node_id: null 
      }
    }
    else if(savedCanvas.nodes.length > 0 && savedCanvas.nodes[0].id !== undefined){
      objUpdate = {
          project_title: this.props.project_title,
          graph_json: savedCanvas,
          user_id: this.props.user_id,
          initial_node_id: savedCanvas.nodes[0].id 
      }
    }
    this.props.saveCanvas(objUpdate, this.props.project_id);
  }

  render() {
    return (
      <div className="diagram-page">
        <DeleteModal props={this.props.props}/>
        <section className="title-and-buttons">
          <h2
              className={this.state.project_title_class ? "hidden" : ""}
              onDoubleClick={()=>this.handleEdit("project_title")}>
              {this.state.project_title}
            </h2>
            <input
              name="project_title"
              placeholder="Enter something..."
              className={this.state.project_title_class ? "" : "hidden"}
              value={this.state.project_title}
              onChange={this.handleChange}
              onKeyDown={(event)=>{
                this.handleKeyDown(event)
                }}
              onKeyUp={(event) => {
              event.stopPropagation()
            }}
            />
          <div className="project-buttons">
            <button
              className="cursor"
              onClick={() => {
                this.props.setDeleteState(this.props.delete_project);
                
              }}
            >
              Delete Project
            </button>
            <button
              onClick={() => {
                console.log("Simulate");
              }}
            >
              Simulate App
            </button>
            <button
              className="cursor"
              onClick={(event) => {
                this.saveCanvas1(event);
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                console.log("Publish");
              }}
            >
              Publish
            </button>
          </div>
        </section>

        <section className="taskbar">
          <div className="taskbar-left-section">
            <div className="taskbar-section">
              <img
                src={Plus}
                className="cursor"
                title="Add Screen"
                alt="alt text"
                onClick={() => {
                  this.createNode();
                }}
              />
            </div>
            <div className="taskbar-section">
              <img 
                src={PaintBucket} 
                alt="alt text" 
                // onClick={() => {
                //   let selectedItems = cerealBox.getSelectedItems();
                //   console.log('SELECTED ITEM', selectedItems)
                //   this.changeColor(selectedItems);
                // }}
              />
              <Swatches cerealBox={cerealBox} changeColor={this.changeColor} updateSelectedColor={this.updateSelectedColor} />
            </div>
            <div className="taskbar-section">
              <img src={Lock} alt="alt text" />
              <img src={Gear} alt="alt text" />
            </div>
            <div className="taskbar-section">
              <img 
                src={Trashcan} 
                className="cursor"
                alt="alt text" 
                title="Delete"
                onClick={() => {
                  let selectedItems = cerealBox.getSelectedItems();
                  this.deleteItem(selectedItems);
                }}
              />
            </div>
          </div>

          <div className="taskbar-right-section">
            <div className="taskbar-section">
              <img 
                className="cursor"
                src={ZoomOut} 
                alt="alt text"
                title="Zoom Out"
                onClick={() => {
                  this.zoomIn();
                }}
               />
              <img 
                className="cursor"
                src={ZoomIn} 
                title="Zoom In"
                alt="alt text"
                onClick={() => {
                  this.zoomOut();
                }}
              />
            </div>
            <div className="taskbar-section">
              <img src={DocSettings} alt="alt text" />
            </div>
          </div>
        </section>
        {
        (this.props.delete_project)?(
          <></>
        ):(
        <BodyWidget engine={engine} />
        )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.user_id,
  project_id: state.project_id,
  project_title: state.project_title,
  graph_json: state.graph_json,
  fetching: state.fetching,
  error: state.error,
  loggedIn: state.loggedIn,
  saving_canvas: state.saving_canvas,
  delete_project: state.delete_project
});

export default connect(
  mapStateToProps,
  { saveCanvas, getCanvasById, deleteProject, setDeleteState }
  )(CustomExample); 


      // Handle Project canvas update on initial load not the same json object
    // if(this.props.graph_json !== prevProps.graph_json && this.props.graph_json !== null){
    //   console.log("if ---------- 2");
    //   setTimeout(()=>{
    //     cerealBox.deSerializeDiagram(this.props.graph_json, engine);
    //     engine.setDiagramModel(cerealBox);
    //     engine.repaintCanvas();
    //   },0);
    // }
    // else{
    //   engine.setDiagramModel(model);
    //   engine.repaintCanvas();
    // }