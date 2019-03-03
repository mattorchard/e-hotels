import React from 'react';
import './App.css';
import './Forms.css';
import {Route, BrowserRouter, Switch, Link} from "react-router-dom";
import HomePage from "./pages/HomePage";
import HotelChainAdminPage from "./pages/HotelChainAdminPage";
import CustomerAdminPage from "./pages/CustomerAdminPage";
import EmployeeAdminPage from "./pages/EmployeeAdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import EmployeeActionsPage from "./pages/EmployeeActionsPage";

class App extends React.Component {
  render() {
    return <BrowserRouter>
      <>
        <header className="banner">
            <h1 className="banner__heading">
              <Link to="/" className="banner__heading-link">
                E-Hotels
              </Link>
            </h1>
        </header>
        <Switch>
          <Route path="/" component={HomePage} exact={true}/>
          <Route path="/admin/hotel-chains" component={HotelChainAdminPage}/>
          <Route path="/admin/customers" component={CustomerAdminPage}/>
          <Route path="/admin/employees" component={EmployeeAdminPage}/>
          <Route path="/employee/:employeeId" component={EmployeeActionsPage}/>

          <Route component={NotFoundPage}/>
        </Switch>
      </>
    </BrowserRouter>;
  }
}

export default App;
