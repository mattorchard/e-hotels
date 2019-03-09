import React from "react";
import Stars from "../Stars";
import HotelChainSelect from "../HotelChainSelect";
import AreaSelect from "../AreaSelect";

export default class BookingSearchOptions extends React.Component {


  state = {
    minPrice: "",
    maxPrice: "",
    minCapacity: "",
    category: "",
    hotelChainName: "",
    minRooms: "",
    area: {
      city: "",
      country: ""
    }
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState(oldState => {
      const newState = {...oldState, [name]: value};
      this.props.onChange(newState);
      return newState;
    });
  };


  render() {
    const {hotelChainNames, hotelAreas} = this.props;
    const {minPrice, maxPrice, minCapacity, category, hotelChain, minRooms, area} = this.state;
    return <form className="search-form">
      <fieldset className="search-form__fields">
        <label>
          Minimum Price
          <input name="minPrice"
                 value={minPrice}
                 className="simple-input"
                 onChange={this.handleInputChange}
                 type="number"/>
        </label>
        <label>
          Max Price
          <input name="maxPrice"
                 value={maxPrice}
                 className="simple-input"
                 onChange={this.handleInputChange}
                 type="number"/>
        </label>
        <label>
          Minimum Capacity
          <input name="minCapacity"
                 value={minCapacity}
                 className="simple-input"
                 onChange={this.handleInputChange}
                 type="number"/>
        </label>
        <label>
          Minimum Hotel Rooms
          <input name="minRooms"
                 value={minRooms}
                 className="simple-input"
                 onChange={this.handleInputChange}
                 type="number"/>
        </label>
        <label>
          Hotel Chain
          <HotelChainSelect
            name="hotelChainName"
            value={hotelChain}
            hotelChainNames={hotelChainNames}
            onChange={this.handleInputChange}/>
        </label>
        <label>
          Area
          <AreaSelect
            name="area"
            areas={hotelAreas}
            value={area}
            onChange={this.handleInputChange}/>
        </label>
        <label>
          Category
          <Stars name="category"
                 number={category}
                 onChange={this.handleInputChange}>
            <label>
              <input type="radio"
                     name="category"
                     value=""
                     onChange={this.handleInputChange}/>
              Any
            </label>
          </Stars>
        </label>
      </fieldset>
    </form>
  }
}