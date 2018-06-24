import React, {Component} from "react";

import {validate} from "../../jslidateUtils";

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
    children.forEach(child => {
      if (child instanceof Object) {
        if (child.props.type === "Validator") {
          if (child.props.validators instanceof Array) {
            const validators = this.props.validators.concat(
              child.props.validators
            );
            const resultValidation = validate(
              formData[child.props.children.props.id],
              validators
            );
            if (resultValidation.length > 0) valid = false;
            map.set(child.props.children.props.id, resultValidation);
          } else {
            const resultValidation = validate(
              formData[child.props.children.props.id],
              this.props.validators
            );
            if (resultValidation.length > 0) valid = false;
            map.set(child.props.children.props.id, resultValidation);
          }
        }
      }
    });

    this.props.onSubmit(e, this, map, valid);
  }

  render() {
    return <form onSubmit={this.handleSubmit}>{this.props.children}</form>;
  }
}

export default Form;
