import React from 'react';
import './App.css';
import ApiTestButton from "./components/ApiTestButton";

class App extends React.Component {
  render() {
    return <main>
      Welcome to Express React
      <ApiTestButton endpoint="/api/test">
        Click to test the API
      </ApiTestButton>
    </main>;
  }
}

export default App;
