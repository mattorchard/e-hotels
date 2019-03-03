import React from "react";

export default class Stars extends React.Component {

  render() {
    return <div className="radio-star-group">
      {this.props.children}
      <input type="radio"
             className="radio-star"
             value="1"
             aria-label="1 Star"
             title="1 Star"
             name={this.props.name}/>
      <input type="radio"
             className="radio-star"
             value="2"
             aria-label="2 Star"
             title="2 Star"
             name={this.props.name}/>
      <input type="radio"
             defaultChecked
             className="radio-star"
             value="3"
             aria-label="3 Star"
             title="3 Star"
             name={this.props.name}/>
      <input type="radio"
             className="radio-star"
             value="4"
             aria-label="4 Star"
             title="4 Star"
             name={this.props.name}/>
      <input type="radio"
             className="radio-star"
             value="5"
             aria-label="5 Star"
             title="5 Star"
             name={this.props.name}/>
    </div>
  }
}