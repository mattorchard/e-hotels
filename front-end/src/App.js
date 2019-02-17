import React from 'react';
import './App.css';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import CustomerPage from "./pages/CustomerPage";
import EmployeePage from "./pages/EmployeePage";

class App extends React.Component {
  render() {
    return <BrowserRouter>
      <>
        <header>
          <h1>E-Hotels</h1>
        </header>
        <Switch>
          <Route path="/" component={HomePage} exact={true}/>
          <Route path="/admin" component={AdminPage}/>
          <Route path="/customer" component={CustomerPage}/>
          <Route path="/employee" component={EmployeePage}/>
        </Switch>
      </>
    </BrowserRouter>;
  }
}

export default App;
