import React from "react";


export default class HotelChainSelect extends React.Component {

  render() {
    const {hotelChainNames, value, onChange, name} = this.props;

    return <select value={value} onChange={onChange} name={name}>
      <option value="">Any</option>
      {hotelChainNames.map(hotelChainName => <option
        key={hotelChainName}
        value={hotelChainName}>
        {hotelChainName}
      </option>)}
    </select>;
  }
}