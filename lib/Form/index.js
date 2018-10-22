import React, {Component} from "react";

import {validate} from "../jslidateUtils";

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const {children} = this.props;
    let formData = {};
    for (let i = 0; i < e.target.length - 1; i++) {
      formData[e.target[i].id] = e.target[i].value;
    }

    const map = new Map();
    let valid = true;
    this.props.children
      .filter(el => el instanceof Object)
      .filter(el => el.props && el.props.type === "Validator")
      .forEach(child => {
        const {children, validators} = child.props;
        const inputs = children.filter(el => el && el.type === "input");
        const target = inputs[0];
        let stuff = this.props.validators;

        if (validators instanceof Array) {
          stuff = stuff.concat(validators);
        }

        const result = validate(formData[target.props.id], stuff);

        if (valid && result.length > 0) {
          valid = false;
        }

        map.set(target.props.id, result);
      });

    this.props.onSubmit(e, this, map, valid);
  }

  render() {
    return <form onSubmit={this.handleSubmit}>{this.props.children}</form>;
  }
}

export default Form;
