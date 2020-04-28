import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import { Toolkit } from '@projectstorm/react-canvas-core';
import { instanceOf } from 'prop-types';
import { AdvancedPortModel } from '../custom-port-link-js/JSCustomPortAndLink';
export class JSCustomNodeWidget extends React.Component {
	constructor(props) {
    super(props);
    this.ENTER_KEY = 13;

    // stack overflow click outside
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      description: "",
      nodeTitle: "",
      editing: false,
      editingDesc: false,
      editingOptions: false,
      selected: false,
      is_parent: false, 
      wantToChange: false
    };
	}
	
  componentDidMount() {
    this.setState({
      ...this.state,
      nodeTitle: this.props.node.options.name,
      description: this.props.node.options.description,
      is_parent: this.props.node.options.is_parent
    });
    
    // stack overflow click outside
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  // stack overflow click outside
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.is_parent !== this.props.node.options.is_parent){
      this.setState({
        ...this.state,
        is_parent: this.props.node.options.is_parent
      });
    }
  }


  handleEdit = (name) => {
    if (name === "description") {
      this.setState({
        ...this.state,
        editingDesc: !this.state.editingDesc,
        wantToChange: true
      });
    } else if (name === "nodeTitle") {
      this.setState({
        ...this.state,
        editing: !this.state.editing,
        wantToChange: true
      });
    } else {
      let mod = name;
      let id = mod.slice(0,-1);
      this.setState({
        ...this.state,
        editingOptions: true,
        wantToChange: true,
        // [id]: !this.state[id]
      });
    }
  }

  handleChange = (event) => {
    event.stopPropagation();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    var val = this.state[event.target.name];
    if (val) {
      if (event.target.name === "description") {
        this.setState({
          ...this.state,
          [event.target.name]: val,
          editingDesc: !this.state.editingDesc
        });
        this.props.node.options.description = this.state[event.target.name];
      } else if (event.target.name === "nodeTitle") {
        this.setState({
          ...this.state,
          [event.target.name]: val,
					editing: !this.state.editing
        });
        this.props.node.options.name = this.state[event.target.name];
      } else {
        let mod = event.target.name;
        let id = mod.slice(0,-1);
        this.setState({
          ...this.state,
          [event.target.name]: val,
          // [id]: !this.state[id]
          editingOptions: !this.state.editingOptions
        });
        let obj = this.props.node.ports;
        for (let key in obj) {
          if (obj[key].options.id === id) {
            obj[key].options.label = this.state[event.target.name];
          }
        }
       
      }
    }
  }

  handleKeyDown = (event, countName) => {
    event.stopPropagation();
    if (event.which === this.ENTER_KEY) {
      this.handleSubmit(event, countName);
    }
  }

  addSubMenu = (event) => {
    event.stopPropagation();
    let UI = Toolkit.UID();
    let x = this.props.node.addOutPort("Click to write here", `out-${this.props.node.options.id + UI + 1}`);
    let promise = new Promise(function(resolve, reject) {
        resolve(x);
    });
    promise.then(()=>{
      this.props.engine.repaintCanvas();
    });
  };

  deletePortAndLinks = (port) =>{
    let x = this.props.node.removePort(port, this.props.engine);
    let promise = new Promise(function(resolve, reject) {
        resolve(x);
    });
    promise.then(()=>{
      this.props.engine.repaintCanvas();
    });
  }

  selectNode = () => {
    this.setState({
      ...this.state,
      selected: !this.state.selected
    });
  }

  makeFirstScreen = () => {
    let model = this.props.engine.getModel();
    let nodes = model.getNodes();
    for(let i = 0; i < nodes.length; i++){
      if(nodes[i].options.id === this.props.node.options.id){
        this.props.node.options.is_parent = true;
        nodes[i].toggleInPortVisibility(false);
      }else{
        nodes[i].options.is_parent = false;
        nodes[i].toggleInPortVisibility(true);
      }
      if(i === nodes.length - 1){
        this.props.engine.repaintCanvas();
      }
    }
  }

  checkBox = () => {
    if(this.state.is_parent === true){
      return <div className="check-box-true" title="First Screen">
        <i className="fas fa-check-square"></i>
      </div>
    }else{
      return <div 
              className="check-box-false"
              title="Make This The First Screen"
              onClick={this.makeFirstScreen}
            >
        <i className="fas fa-check-square"></i>
      </div>
    }
  }

  subMenuGenerator = () => {
    let obj = this.props.node.ports;
    let menus = [];
    let count = "00";
    
    for (let key in obj) {
      if (obj[key].options.in === false) {
        count = (Number(count) + 1).toString();
        if(count.length < 2){
          count = 0 + count + ".";
        }else{
          count = count + ".";
        }
        let id = obj[key].options.id;
        
        let mod = id + "a";
        let countName = count + mod;
        if(this.state[id] === undefined){
          this.setState({
            ...this.state,
            [id]: false,
            [mod]: obj[key].options.label,
            [countName]: count
          });
        }
        menus.push(
          <div key={key} className="custom-node-submenus">
            <div className="submenu-text-container">
            <h2 className="number">{count}</h2>
            <h2
              // className={this.state[id] ? "hidden" : "option-text"}
              className={this.state.editingOptions ? "hidden" : "option-text"}
              onClick={()=>this.handleEdit(mod)}
              title="Click to Edit"
              >
              {this.state[mod]}
            </h2>
            <input
              name={mod}
              placeholder="Enter something..."
              // className={this.state[id] ? "" : "hidden"}
              className={this.state.editingOptions ? "" : "hidden"}
              value={this.state[mod]}
              onChange={this.handleChange}
              onKeyDown={(event)=>{
                this.handleKeyDown(event, countName)
                }}
              onKeyUp={(event) => {
              event.stopPropagation();
            }}
            />
            </div>
            <div onClick={()=>this.deletePortAndLinks(obj[key])} className="trash-icon">
              <i 
                className="fas fa-trash-alt"
                title="Delete Option"
              ></i>
            </div>
            <div className="line-out">
							<PortWidget engine={this.props.engine} port={this.props.node.getPortByPort(obj[key], this.props.node, obj[key].options.name)} />
            </div>
          </div>
        );
			}
    }
    return menus;
  };

  // {this.props.node.getPort(obj[key].options.name)}

  // stack overflow click outside
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  // stack overflow click outside
  handleClickOutside(event) {
    // event = {...event, name: }
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.state.wantToChange === true
    ) {
      this.setState({
        ...this.state,
        wantToChange: false,
        description: this.state.description,
        nodeTitle: this.state.nodeTitle,
        editingDesc: false,
        editing: false,
        editingOptions: false
      });
      this.props.node.options.description = this.state.description;
      this.props.node.options.name = this.state.nodeTitle;

      // this saves a node's options when clicking save app, after you have clicked outside it to save
      // loop through this.state object and selects all keys that are generated from a node's options
      for(let key in this.state){
        if (key != "description" && key != "editing" && key != "editingDesc" && key != "editingOptions" && key != "is_parent" && key != "nodeTitle" && key != "selected" && key != "wantToChange")
        {
          const value = this.state[key]
          // selects keys that are boolean type, this is the id of option
          // from the id, we can get the key for the label by adding an 'a' to the id key
          // the value of the label is the name of the option
          if(typeof value === "boolean"){
            let id = key
            let ida = id+"a"
            let label = this.state[ida]
            // this saves the label's name to props, allowing it to save after clicking save app
            for (let key2 in this.props.node.ports) {
              if (this.props.node.ports[key2].options.id === id) {
                this.props.node.ports[key2].options.label = label;
              }
            }
          }
        }
      }

    }
  }


	render() {
		return (
			<div 
      className={`custom-node selected-${this.props.node.isSelected()}`}
      ref={this.setWrapperRef}
      >
        <div className="custom-node-nodeTitle">
          {/* {(this.props.node.options.in_port_visible === true)?( */}
          <div className="line-in">
						<PortWidget engine={this.props.engine} port={this.props.node.getPort('in')} />
          </div>
          {/* ):(
            null
          )} */}

          <h1
            className={this.state.editing ? "hidden" : ""}
            onClick={() => this.handleEdit("nodeTitle")}
          >
            {this.state.nodeTitle}
          </h1>
          <input
            name="nodeTitle"
            placeholder="Enter something..."
            className={this.state.editing ? "" : "hidden"}
            value={this.state.nodeTitle}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onKeyUp={(event) => {
              event.stopPropagation();
            }}
          />
          {this.checkBox()}
        </div>

        <div className="custom-node-screen">
          <p
            className={this.state.editingDesc ? "hidden" : ""}
            onClick={() => this.handleEdit("description")}
          >
            {this.state.description}
          </p>
          <textarea
            name="description"
            placeholder="Click to write here"
            wrap="hard"
            maxLength="182"
            className={this.state.editingDesc ? "" : "hidden"}
            value={this.state.description}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onKeyUp={(event) => {
              event.stopPropagation();
            }}
          />
        </div>

        <div>{this.subMenuGenerator()}</div>
        <div className="custom-node-addMenuOption">
          <h2>Add menu option...</h2>
          <i 
                className="fas fa-plus-square"
                title="Add Screen"
                onClick={(event) => {
              this.addSubMenu(event);
            }}
          ></i>
        </div>
      </div>
		);
	}
}

