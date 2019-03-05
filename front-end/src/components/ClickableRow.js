import React from "react";

const shouldClick = event => {
  if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    return true;
  }
};

const ClickableRow = ({children, onClick, className="", ...otherProps}) =>
  <tr role="button"
      tabIndex="0"
      onClick={onClick}
      onKeyPress={event => shouldClick(event) && onClick(event)}
      className={"clickable-row " + className}
      {...otherProps}>
    {children}
  </tr>;

export default ClickableRow;