import React from "react";

export default props => {
  const {streetName, streetNumber, city, country, ...otherProps} = props;
  return <>
    {streetNumber} {streetName}{otherProps.twoLine ? "<br/>" : ", "}{city} {country}
  </>
}