import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Config from "../../assets/config";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  async componentDidMount() {
    try {
      await axios.post(`${Config.LINK}/admin/logout`);
      this.props.setLoggedin();
    } catch (er) {}
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
