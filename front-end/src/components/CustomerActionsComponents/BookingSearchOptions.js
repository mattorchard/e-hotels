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
    return <form className="search-form">
      <fieldset className="search-form__fields">
        <label>
          Minimum price
          <input name="minPrice"
                 value={minPrice}
                 className="simple-input"
                 onChange={this.handleInputChange}
                 type="number"/>
        </label>
        <label>
          Max price
          <input name="maxPrice"
                 value={maxPrice}
                 className="simple-input"
                 onChange={this.handleInputChange}
                 type="number"/>
        </label>
        <label>
          Minimum capacity
          <input name="minCapacity"
                 value={minCapacity}
                 className="simple-input"
                 onChange={this.handleInputChange}
                 type="number"/>
        </label>
        <label>
          Minimum hotel rooms
          <input name="minRooms"
                 value={minRooms}
                 className="simple-input"
                 onChange={this.handleInputChange}
                 type="number"/>
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