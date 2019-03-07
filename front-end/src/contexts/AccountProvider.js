import React from "react";
import AccountContext from "./AccountContext";

export default class AccountProvider extends React.Component {

  setAccount = account => this.setState({account});

  state = {
    account: {},
    setAccount: this.setAccount
  };

  render() {
    return <AccountContext.Provider value={this.state}>
      {this.props.children}
    </AccountContext.Provider>
  }
}