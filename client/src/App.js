import React, { Component } from "react";
//import RegForm from "./Components/regForm/RegForm.js";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Components/Main/Main.js";
import Preview from "./Components/Preview/Preview";
import RegistrationDetails from "./Components/RegistrationDetails/RegistrationDetails";
import Success from "./Components/Success/Success";
import Layout from "./Components/Layout/Layout";
import Admin from "./Components/Admin/Admin";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Switch>
              <Route exact path="/admin" component={Admin}></Route>
              <Route exact path="/" component={Main}></Route>
              {/* <Route exact path="/register" component={RegForm}></Route> */}
              <Route
                exact
                path="/register"
                component={RegistrationForm}
              ></Route>
              <Route path="/preview/:id" component={Preview}></Route>
              <Route
                path="/registration-details/:id"
                component={RegistrationDetails}
              ></Route>
              <Route path="/register/:id" component={Success}></Route>
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
