import React from "react";

const Address = ({streetName, streetNumber, city, country, ...otherProps}) => <>
    {streetNumber} {streetName}{otherProps.twoLine ? <br/> : ", "}{city} {country}
  </>;
export default Address;