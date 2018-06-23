import "./index.css";
import React, {Component} from "react";

import Form from "../Form";
import {splitIntoSpans} from "../../jslidateUtils";

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
    errors: {}
  };

  onSubmit(e, target, validation) {
    this.setState({valid: validation.valid});
    this.setState({errors: validation.errors});
  }

  render() {
    const valid = this.state.valid;
    const errors = this.state.errors;
    return (
      <main className="app">
        <Form
          onSubmit={this.onSubmit}
          validators={[minLength(3), containsLetter()]}
        >
          {valid ? null : (
            <div
              dangerouslySetInnerHTML={{
                __html: splitIntoSpans(errors[0].errors, "form__spanError")
              }}
            />
          )}
          <input id="input1" type="text" />
          {valid ? null : (
            <div
              dangerouslySetInnerHTML={{
                __html: splitIntoSpans(errors[1].errors, "form__spanError")
              }}
            />
          )}
          <input id="input2" type="text" />

          <input type="submit" value="OK" />
        </Form>
      </main>
    );
  }
}

export default App;
