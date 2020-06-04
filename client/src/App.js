import React, { Component } from "react";
import RegForm from "./Components/regForm/RegForm";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Components/Main/Main";
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
