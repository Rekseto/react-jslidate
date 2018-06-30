import "./index.css";
import React, {Component} from "react";

import Form from "../Form";
import Validator from "../Validator";

const minLength = a =>
  function(val) {
    if (val.length >= a) {
      return true;
    } else {
      return {error: `Value must be greater than ${a}`};
    }
  };

const containsLetter = () =>
  function(val) {
    if (val.includes("a")) {
      return true;
    } else {
      return {error: "Value must include a letter"};
    }
  };

class App extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    valid: true,
    errors: new Map()
  };

  onSubmit(e, target, errors, valid) {
    this.setState({valid: valid});
    this.setState({errors: errors});
  }

  render() {
    const valid = this.state.valid;
    const errors = this.state.errors;
    return (
      <main className="app">
        <Form onSubmit={this.onSubmit} validators={[minLength(3)]}>
          <input id="input1" type="text" />

          <Validator
            validators={[containsLetter()]}
            errors={errors}
            valid={valid}
          >
            {valid
              ? null
              : errors.get("input3").map((error, index) => (
                  <span className="form__spanError" key={index}>
                    {error}
                  </span>
                ))}
            <input id="input3" type="text" />
          </Validator>
          <input type="submit" value="OK" />
        </Form>
      </main>
    );
  }
}

export default App;
