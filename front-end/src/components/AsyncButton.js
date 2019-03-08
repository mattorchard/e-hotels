import React from "react";

export default class AsyncButton extends React.Component {

  mounted = true;

  state = {
    loading: false
  };

  handleClick = async event => {
    try {
      this.setState({loading: true});
      await this.props.onClick(event);
      if (this.mounted) {
        this.setState({loading: false});
      }
    } catch (error) {
      if (this.mounted) {
        this.setState({loading: false});
      }
      throw error;
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const {children, className, onClick, ...otherProps} = this.props;
    const {loading} = this.state;
    return <button
      className={className + (loading ? " spinner spinner-inverse" : "")}
      onClick={loading ? null : this.handleClick}
      {...otherProps}>

      {children}

    </button>;
  }
}