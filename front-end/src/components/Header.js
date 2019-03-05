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
          <li>
            <Link to="/" className="banner__heading-link">
              E-Hotels
            </Link>
          </li>
          {path.map(({url, text}) => <li key={text}>
            <Link to={url} className="banner__heading-link">{text}</Link>
          </li>)}

        </ol>
      </h1>
      <div className="banner__actions">
        {actions}
      </div>
    </header>
  }
}
