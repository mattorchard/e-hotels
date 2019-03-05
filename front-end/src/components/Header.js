import React from "react";
import {Link} from "react-router-dom";
import HeaderContext from "../contexts/HeaderContext";


export class Header extends React.Component {
  static contextType = HeaderContext;
  render() {
    const {path, actions} = this.context;
    return <header className="banner">
      <h1 className="banner__heading">
        <Link to="/" className="banner__heading-link">
          E-Hotels
        </Link>
        {path}
      </h1>
      {actions}
    </header>
  }
}
