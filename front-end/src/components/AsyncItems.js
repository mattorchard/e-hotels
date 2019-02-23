import React from "react";

export const AsyncItems =
  ({loading, children, loadingMessage="Loading...", placeholderMessage="", TextWrapper="p"}) => {
    if (loading) {
      return <TextWrapper className="spinner">
        {loadingMessage}
      </TextWrapper>;
    } else if (!children || children.length < 1) {
      return <TextWrapper>{placeholderMessage}</TextWrapper>;
    } else {
      return children;
    }
  };