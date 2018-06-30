import React, {Component} from "react";
import {splitIntoSpans} from "../../jslidateUtils";
class Validator extends Component {
  static defaultProps = {
    type: "Validator"
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Validator;
