import React from "react";
import {Link, withRouter} from "react-router-dom";


const HeaderActions = ({path}) => {
  console.log(path);
  if (path.startsWith("/employee")) {
    return <Link to="/admin/employees" className="btn">Logout</Link>
  } else if (path.startsWith("/customer")) {
    return <Link to="/admin/customers" className="btn">Logout</Link>
  }
  return "";
};

class Header extends React.Component {

  render() {
    const path = this.props.location.pathname;
    return <header className="banner">
      <h1 className="banner__heading">
        <Link to="/" className="banner__heading-link">
          E-Hotels
        </Link>
        {path}
      </h1>
      <div className="banner__actions">
        <HeaderActions path={path}/>
      </div>
    </header>
  }
}

export default withRouter(Header);