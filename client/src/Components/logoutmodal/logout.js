import React, { Component } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  async componentDidMount() {
    try {
      await axios.post("http://localhost:5000/api/v1/admin/logout");
      this.props.setLoggedin();
    } catch (er) {}
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
