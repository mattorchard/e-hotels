import React from "react";
import ReactForm from "./ReactForm";


const RemovableListItem = ({value, onRemove}) => <li className="removable-list-item">
  {value}
  <button type="button"
          className="btn btn--char"
          aria-label="Remove"
          title="Remove"
          onClick={() => onRemove(value)}>
    &times;
  </button>
</li>;

export default class ListInput extends ReactForm {

  state = {
    newValue: ""
  };

  onKeyPress = event => {
    if (event.key === "Enter" && event.currentTarget.checkValidity()) {
      this.addNewValue(this.state.newValue);
      event.preventDefault();
    }
  };

  renderInput = () => React.cloneElement(
    React.Children.only(this.props.children), {
      required: false,
      name: "newValue",
      value: this.state.newValue,
      onChange: this.handleInputChange,
      onKeyPress: this.onKeyPress
    });

  addNewValue = value => {
    if (!value) {
      // Cannot add Empty values
      return false;
    }
    const formattedValue = this.props.format ? this.props.format(value) : value;
    if (this.props.value.includes(formattedValue)) {
      this.setState({newValue: ""});
    } else {
      const newValueList = [formattedValue, ...this.props.value];
      this.setState({newValue: ""});
      this.props.onChange({target: {value: newValueList, name: this.props.name}});
    }
  };

  removeValue = value => {
    const newValueList = this.props.value.filter(v => v !== value);
    this.props.onChange({target: {value: newValueList, name: this.props.name}});
  };

  render() {
    const {value, label, listClassName = ""} = this.props;
    return <>
      <label>
        {label}
        <span className="input-row">
          {this.renderInput()}
          <button type="button"
                  className="btn btn--char"
                  aria-label="Add"
                  title="Add"
                  onClick={() => this.addNewValue(this.state.newValue)}>
            +
          </button>
        </span>
        <ul className={"list-input__list rails" + listClassName}>
          {value.map(v => <RemovableListItem key={v} value={v} onRemove={this.removeValue}/>)}
        </ul>
      </label>
    </>
  }
}