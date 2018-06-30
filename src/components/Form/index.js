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
    children
      .filter(el => {
        if (el instanceof Object && el.props.type === "Validator") return el;
      })
      .forEach(child => {
        const target = child.props.children.filter((el, index) => {
          if (el && el.type === "input") return el;
        })[0];

        if (child.props.validators instanceof Array) {
          const validators = this.props.validators.concat(
            child.props.validators
          );

          const resultValidation = validate(
            formData[target.props.id],
            validators
          );
          if (resultValidation.length > 0) valid = false;
          map.set(target.props.id, resultValidation);
        } else {
          const resultValidation = validate(
            formData[target.props.id],
            this.props.validators
          );
          if (resultValidation.length > 0) valid = false;
          map.set(target.props.id, resultValidation);
        }
      });

    this.props.onSubmit(e, this, map, valid);
  }

  render() {
    return <form onSubmit={this.handleSubmit}>{this.props.children}</form>;
  }
}

export default Form;
