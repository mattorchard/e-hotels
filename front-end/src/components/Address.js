import React from "react";

export default ({streetName, streetNumber, city, country, ...otherProps}) => <>
    {streetNumber} {streetName}{otherProps.twoLine ? <br/> : ", "}{city} {country}
  </>;