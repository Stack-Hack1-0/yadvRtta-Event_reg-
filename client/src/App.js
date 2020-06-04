import React, { Component } from "react";
import RegForm from "./Components/regForm/RegForm.js";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Components/Main/Main.js";
import Preview from "./Components/Preview/Preview";
import Success from "./Components/Success/Success";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
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
