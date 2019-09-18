import {
  DefaultPortModel,
  NodeModel
} from "@projectstorm/react-diagrams";
import { Toolkit } from '@projectstorm/react-canvas-core';
import {AdvancedPortModel, AdvancedLinkModel} from "../custom-port-link-js/JSCustomPortAndLink"
import * as _ from "lodash";
export class JSCustomNodeModel extends NodeModel {
  constructor(options = {}) {
    super({
      ...options,
      type: "js-custom-node"
    });
    this.color = this.color || { options: "red" };
    this.name = this.options.name;
    this.description = this.options.description;
    this.is_parent = this.options.is_parent;
    this.in_port_visible = this.options.in_port_visible;
    this.addInPort();
  }

  deserialize(event) {
		super.deserialize(event);
		this.options.name = event.data.name;
    this.options.color = event.data.color;
    this.options.description = event.data.description;
    this.options.is_parent = event.data.is_parent;
    this.options.in_port_visible = event.data.in_port_visible;
	}

	serialize(){
		return {
			...super.serialize(),
			name: this.options.name,
      color: this.options.color,
      description: this.options.description,
      is_parent: this.options.is_parent,
      in_port_visible: this.options.in_port_visible
		};
	}

  nameNode(name) {
    this.options.name = name;
  }

  provideDescription(description) {
    this.options.description = description;
  }

  addOutPort(label, name) {
    let port = this.addPort(
      new AdvancedPortModel({
        in: false,
        label: label,
        name: name
      })
    );
    return port;
  }

 
  addInPort() {
    let port = this.addPort(
      this.addPort(
        new AdvancedPortModel({
          in: true,
          name: "in",
          locked: true,
          in_port_visible: true
        })
      )
    );
    return port;
  }

  toggleInPortVisibility(truthy){
    this.options.in_port_visible = truthy;
  }

  removePort(port, engine) {
    let model = engine.getModel();
    let links = port.getLinks();
    for(let key in links){
      model.removeLink(links[key]);
    }
    super.removePort(port);
  }

  removePorts(engine) {
    let model = engine.getModel();
    _.forEach(this.ports, port => {
      let links = port.getLinks();
      for(let key in links){
        model.removeLink(links[key]);
      }
      super.removePort(port);
    });
  }

  getPortByPort(port, node, name){
    return node.getPort(name);
	}

}
