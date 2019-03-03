import React from "react";
import ClickableRow from "./ClickableRow";

export default class SelectableRow extends React.Component {
  state = {
    selected: false
  };

  selectRow = event => {
    this.setState({selected: true});
    this.focusListener = this.onFocusIn(event.currentTarget);
    document.addEventListener("focusin", this.focusListener);
  };

  onFocusIn = container => event => {
    if (!container.contains(event.target)) {
      this.onCancel();
    }
  };

  componentWillUnmount() {
    this.onCancel();
  }

  onCancel = event => {
    this.setState({selected: false});
    if (event) {
      event.stopPropagation();
    }
    if (this.focusListener) {
      document.removeEventListener("focusin", this.focusListener);
    }
  };


  render() {
    const selected = this.state.selected;
    const {render, ...otherProps} = this.props;

    return <ClickableRow data-selected={selected ? "true" : "false"}
      onClick={this.selectRow}
      {...otherProps}>
      {render({selected, cancel: this.onCancel})}
    </ClickableRow>
  }
}


