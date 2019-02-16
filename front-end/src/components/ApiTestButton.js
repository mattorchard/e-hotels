import React from "react";

export default class ApiTestButton extends React.Component {
  state = {
    clicked: false,
    loading: false,
    testResult: null
  };

  testApi = async () => {
    try {
      this.setState({clicked: true, loading: true});
      const response = await fetch(this.props.endpoint);
      if (!response.ok) {
        return this.setState({testResult: `Fetch failed with code ${response.status}`});
      }
      const data = await response.json();
      this.setState({testResult: JSON.stringify(data, null, 2)});
    } catch (error) {
      this.setState({testResult: `Failed to call API with error ${error}`})
    } finally {
      this.setState({loading: false});
    }
  };

  render() {
    if (this.state.loading) {
      return <div className="spinner">
        Loading...
      </div>
    } else {
      return <button onClick={this.testApi}>
        {this.state.clicked ? this.state.testResult : this.props.children}
      </button>
    }
  }
}
