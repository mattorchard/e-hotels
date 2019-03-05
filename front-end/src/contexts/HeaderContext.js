import React from "react";

const HeaderContext = React.createContext({
  path: [],
  actions: [],
  setPath: () => {},
  setActions: () => {}
});
export default HeaderContext;
/*
  setPath = path => this.setState({path});

  setActions = actions => this.setState({actions});

  state = {
    path: [],
    actions: [],
    setPath: this.setPath,
    setActions: this.setActions
  };
 */