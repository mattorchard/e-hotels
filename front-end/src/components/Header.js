import React from "react";
import {Link} from "react-router-dom";
import HeaderContext from "../contexts/HeaderContext";


export class Header extends React.Component {
  static contextType = HeaderContext;

  render() {
    const {path, actions} = this.context;
    return <header className="banner">
      <h1 className="banner__heading">
        <ol className="banner__breadcrumbs breadcrumbs">
          <li className="banner__breadcrumb">
            <Link to="/" className="banner__heading-link">
              E-Hotels
            </Link>
          </li>
          {path.map(({url, text, className}) =>
            <li key={text} className="banner__breadcrumb">
            <Link to={url} className={"banner__heading-link " + className}>{text}</Link>
          </li>)}

        </ol>
      </h1>
      <div className="banner__actions">
        {actions}
      </div>
    </header>
  }
}
