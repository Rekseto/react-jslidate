# react-jslidate

Simple library to provide validation for your forms

## Sample usage

## Sample validatiors (are based on currying functions)

```javascript
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
```

## Usign react-jslidate

```javascript
import "./index.css";
import React, {Component} from "react";

import Form from "../Form";
import Validator from "../Validator";

class App extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    valid: true,
    errors: {}
  };

  onSubmit(e, target, errors, valid) {
    this.setState({valid: valid});
    this.setState({errors: errors});
    // Here you can do any actions based on form is passed or not.
  }

  render() {
    const valid = this.state.valid;
    const errors = this.state.errors;
    // both of these values are stored in State but you can move it to Redux Store.
    return (
      <main className="app">
        <Form onSubmit={this.onSubmit} validators={[minLength(3)]}>
          // Form can have validators that are applied to every Validator
          <Validator
            validators={[containsLetter()]} // validators applied only to content inside of Validator
            errors={errors} //Error will be appear inside of Validator Component with className form__spanError
            valid={valid}
          >
            <input id="input3" type="text" />
          </Validator>
          <input type="submit" value="OK" />
        </Form>
      </main>
    );
  }
}

export default App;
```
