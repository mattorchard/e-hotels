import React from "react";

export default class ExpandingList extends React.Component {
  state = {expanded: false};

  expand = event => {
    event.stopPropagation();
    this.setState({expanded: true});
  };

  collapse = event => {
    event.stopPropagation();
    this.setState({expanded: false});
  };

  render() {
    const {children, collapsible, numCollapsed = 3, expandLabel = "Show all", collapseLabel = "Hide"} = this.props;
    if (!children || children.length <= (numCollapsed)) {
      return children;
    } else if (this.state.expanded) {
      if (collapsible) {
        return <>
          {children}
          <li className="expanding-list">
            <button type="button" className="btn btn--inline expanding-list__btn" onClick={this.collapse}>
              {collapseLabel}
            </button>
          </li>
        </>
      } else {
        return children;
      }
    } else {
      const beforeFold = children.slice(0, numCollapsed - 1);
      return <>
        {beforeFold}
        <li className="expanding-list">
          <button type="button" className="btn btn--inline expanding-list__btn" onClick={this.expand}>
            {expandLabel}
          </button>
        </li>
      </>
    }
  }
}