import React from "react";
import {Link, withRouter} from "react-router-dom";
import AccountContext from "../contexts/AccountContext";


class HeaderActions extends React.Component {
  static contextType = AccountContext;


  render() {
    const {accountType} = this.context.account;
    if (!accountType) {
      return "";
    }
    let to = "/";
    if (accountType === "employee") {
      to = "/admin/employees";
    } else if (accountType === "customer") {
      to = "/admin/customers";
    }
    return <div className="banner__actions">
      <Link to={to} className="btn" onClick={() => this.context.setAccount({})}>
        Logout
      </Link>
    </div>
  }
}

class Header extends React.Component {

  render() {
    const path = this.props.location.pathname;
    return <header className="banner">
      <h1 className="banner__heading">
        <ol className="banner__breadcrumbs breadcrumbs">
          <li className="banner__breadcrumb">
            <Link to="/" className="banner__heading-link">
              E-Hotels
            </Link>
          </li>
          {path}
        </ol>
      </h1>
      <HeaderActions/>
    </header>
  }
}
export default withRouter(Header);