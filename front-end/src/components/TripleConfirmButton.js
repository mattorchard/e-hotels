import React from "react";

export default class TripleConfirmButton extends React.Component {

  state = {
    numConfirms: 0
  };

  handleClick = () => {
    this.setState(({numConfirms}) => {
      const newConfirms = numConfirms + 1;
      if (newConfirms > 2) {
        this.props.onClick();
      }
      return {numConfirms: newConfirms}
    });
  };

  render() {
    const {onClick, children, ...buttonProps} = this.props;
    const {numConfirms} = this.state;
    let contents = children;
    if (numConfirms === 1) {
      contents = "I'm sure";
    } else if (numConfirms > 1) {
      contents = "I'm positive";
    }
    return <button {...buttonProps} onClick={this.handleClick}>
      {contents}
    </button>
  }
}