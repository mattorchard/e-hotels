import React from "react";
export default class ShowContentButton extends React.Component {
  state = {
    show: false
  };

  showContents = async onClick => {
    this.setState({show: true});
    if (onClick) {
      try {
        await onClick();
      } catch (error) {
        this.setState({show: false});
      }
    }
  };

  render() {
    const {children, buttonLabel, onClick, ...props} = this.props;
    if (this.state.show) {
      return children;
    } else {
      return <button type="button" {...props}
                     onClick={() => this.showContents(onClick)}>
        {buttonLabel || "Show"}
      </button>
    }
  }
}