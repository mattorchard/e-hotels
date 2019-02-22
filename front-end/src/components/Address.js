import React from "react";

export default props => {
  const {streetName, streetNumber, city, country, ...otherProps} = props;
  return <div className={otherProps.className}>
    {streetNumber} {streetName}{otherProps.twoLine ? "<br/>" : ", "}{city} {country}
  </div>
}