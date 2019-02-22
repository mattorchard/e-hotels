import React from "react";
export default class ShowContentButton extends React.Component {
  state = {
    show: false
  };

  render() {
    const {children, buttonLabel, onClick, ...props} = this.props;
    if (this.state.show) {
      return children;
    } else {
      return <button type="button" {...props}
                     onClick={() => {
                       this.setState({show: true});
                       onClick && onClick();
                     }}>
        {buttonLabel || "Show"}
      </button>
    }
  }
}