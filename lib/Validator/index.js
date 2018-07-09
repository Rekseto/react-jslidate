import React, {Component} from "react";
class Validator extends Component {
  static defaultProps = {
    type: "Validator"
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Validator;
