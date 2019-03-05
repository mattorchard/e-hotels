import React from "react";

export default class Stars extends React.Component {

  render() {
    const {number, children, disabled, name} = this.props;
    return <div className="radio-star-group">
      {children}
      {[1, 2, 3, 4, 5].map(category =>
      <input type="radio"
             className="radio-star"
             key={category}
             value={category}
             aria-label={category + " Star"}
             title={category + " Star"}
             defaultChecked={number === category}
             disabled={disabled}
             name={name}/>
      )}
    </div>
  }
}