import React, {Component} from "react";

import {validate} from "../../jslidateUtils";

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let formData = {};
    for (let i = 0; i < e.target.length - 1; i++) {
      formData[e.target[i].id] = e.target[i].value;
    }
    const resultValidation = validate(formData, this.props.validators);
    this.props.onSubmit(e, this, resultValidation);
  }

  render() {
    return <form onSubmit={this.handleSubmit}>{this.props.children}</form>;
  }
}

export default Form;
