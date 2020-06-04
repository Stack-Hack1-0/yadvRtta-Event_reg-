import React, { Component } from "react";
import RegForm from "./components/regForm/RegForm.js";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Components/Main/Main.js";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route exact path="/register" component={RegForm}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
