import React, { Component } from "react";
import RegForm from "./Components/regForm/RegForm.js";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Components/Main/Main.js";
import Preview from "./Components/Preview/Preview";
import Success from "./Components/Success/Success";

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
            <Route path="/preview/:id" component={Preview}></Route>
            <Route path="/register/:id" component = {Success}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
