import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Success.css";

class Success extends Component {
  constructor() {
    super();
    this.state = {
      registrationId: null,
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.setState({ registrationId: this.props.match.params.id });
  }

  render() {
    return (
      <div className="Suc">
        <div className="Success">
          <h1>Registered Successfully!!!!</h1>
          <h2>Your Registration Id is : {this.state.registrationId}</h2>
          <button onClick={() => this.props.history.push("/")}>
            RETURN TO HOME
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Success);
