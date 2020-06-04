import React, { Component } from "react";
import RegForm from "./Components/regForm/RegForm";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Components/Main/Main";
import Admin from "./Components/Admin/Admin";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/admin" component={Admin}></Route>
            <Route exact path="/" component={Main}></Route>
            <Route exact path="/register" component={RegForm}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
