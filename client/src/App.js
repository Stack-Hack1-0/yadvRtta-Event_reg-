import React, { Component } from "react";
import RegForm from "./Components/regForm/RegForm.js";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Components/Main/Main.js";
import Preview from "./Components/Preview/Preview";
import RegistrationDetails from "./Components/RegistrationDetails/RegistrationDetails";
import Success from "./Components/Success/Success";
import Layout from "./Components/Layout/Layout";
import Admin from "./Components/Admin/Admin";
import axios from "axios";
import Logout from "./Components/logoutmodal/logout";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import Config from "./assets/config";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: false,
      isLoading: true,
    };
  }
  getLogin = async () => {
    try {
      const res = await axios.get(`${Config.LINK}/admin/isLoggedin`);
      if (res.data.isLoggedin) {
        console.log("login");
        this.setState({ isLoggedin: true, isLoading: false });
      }
    } catch (er) {}
    this.setState({ isLoading: false });
  };
  async componentDidMount() {
    await this.getLogin();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout isLoggedin={this.state.isLoggedin}>
            <Switch>
              <Route
                exact
                path="/admin"
                component={() => {
                  return (
                    <Admin
                      isLoading={this.state.isLoading}
                      isLoggedin={this.state.isLoggedin}
                      setLoggedin={() => this.setState({ isLoggedin: true })}
                    />
                  );
                }}
              ></Route>
              <Route
                exact
                path="/logout"
                component={() => (
                  <Logout
                    setLoggedin={() => this.setState({ isLoggedin: false })}
                  />
                )}
              ></Route>
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
