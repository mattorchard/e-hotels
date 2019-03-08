import React from "react";
import Stars from "../Stars";


export default class BookingSearchOptions extends React.Component {


  state = {
    minPrice: "",
    maxPrice: "",
    minCapacity: "",
    category: "",
    chain: "",
    minRooms: "",
    city: "",
    country: ""
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
    const {minPrice, maxPrice, minCapacity, category, chain, minRooms, area} = this.state;
    return <form>
      <fieldset className="search-form">
        <label>
          Minimum price
          <input name="minPrice"
                 value={minPrice}
                 onChange={this.handleInputChange}
                 type="number"/>
        </label>
        <label>
          Max price
          <input name="maxPrice"
                 value={maxPrice}
                 onChange={this.handleInputChange}
                 type="number"/>
        </label>
        <label>
          Minimum capacity
          <input name="minCapacity"
                 value={minCapacity}
                 onChange={this.handleInputChange}
                 type="number"/>
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
        <label>
          Hotel Chain
          <select/>
        </label>
        <label>
          Area
          <select/>
        </label>
        <label>
          Minimum rooms in hotel
          <input name="minRooms"
                 value={minRooms}
                 onChange={this.handleInputChange}
                 type="number"/>
        </label>
      </fieldset>
    </form>
  }
}