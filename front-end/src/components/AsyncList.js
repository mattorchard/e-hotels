import React from "react";

export const AsyncList =
  ({ordered, loading, children, loadingMessage, placeholderMessage, ...props}) => {
    const ListType = ordered ? "ol" : "ul";

    let content = null;
    if (loading) {
      content = <p className="spinner">
        {loadingMessage || "Loading..."}
      </p>;
    } else if (children && children.length > 0) {
      content = children;
    } else {
      content = placeholderMessage ? <p>{placeholderMessage}</p> : ""
    }

    return <ListType {...props}>
      {content}
    </ListType>
  };