import React from "react";

const ItemWrapper = ({children, wrapper}) => {
  switch(wrapper) {
    case "table":
      return <tr><td>{children}</td></tr>;
    case "li":
      return <li>{children}</li>;
    default:
      return children;
  }
};

export const AsyncItems =
  ({loading, children, wrapper="li", loadingMessage="Loading...", placeholderMessage=""}) => {
    if (loading) {
      return <ItemWrapper wrapper={wrapper}>
        <p className="spinner">{loadingMessage}</p>
      </ItemWrapper>
    } else if (!children || children.length < 1) {
      return <ItemWrapper wrapper={wrapper}>
        {placeholderMessage}
        </ItemWrapper>;
    } else {
      return children;
    }
  };