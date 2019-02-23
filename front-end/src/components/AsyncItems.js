import React from "react";

export const AsyncItems =
  ({loading, children, loadingMessage="Loading...", placeholderMessage = ""}) => {
    if (loading) {
      return <p className="spinner">{loadingMessage}</p>;
    } else if (!children || children.length < 1) {
      return placeholderMessage;
    } else {
      return children;
    }
  };