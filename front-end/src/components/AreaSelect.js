import React from "react";


export default class AreaSelect extends React.Component {

  handleChange = event => {
    const {areas, name} = this.props;
    const index = event.currentTarget.value;
    const value = index === -1 ? {city: "", country: ""} : areas[index];
    this.props.onChange({target: {name, value}})
  };

  render() {
    const {areas, value, name} = this.props;
    const index = value ? areas.findIndex(area => area.city === value.city && area.country === value.country) : -1;

    return <select value={index} onChange={this.handleChange} name={name}>
      <option value="-1">Any</option>
      {areas.map((area, index) => <option
        key={`${area.city}-${area.country}`}
        value={index}>
        {area.city}, {area.country}
      </option>)}
    </select>;
  }
}