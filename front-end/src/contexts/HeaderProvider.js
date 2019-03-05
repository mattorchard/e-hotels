import React from "react";
import HeaderContext from "./HeaderContext";

export default class HeaderProvider extends React.Component {
  static contextType = HeaderContext;

  setPath = path => this.setState({path});

  setActions = actions => this.setState({actions});

  state = {
    path: [],
    actions: [],
    setPath: this.setPath,
    setActions: this.setActions
  };

  render() {
    return <HeaderContext.Provider value={this.state}>
      {this.props.children}
    </HeaderContext.Provider>
  }
}