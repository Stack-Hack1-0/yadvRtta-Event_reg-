import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AddToCalender from "react-add-to-calendar";
import "./Success.css";

class Success extends Component {
  constructor() {
    super();
    this.state = {
      registrationId: null,
    };
  }

  event = {
    title: "YadvRtta",
    description: "Help you boost your skill!",
    location: "Bhubaneswar, India",
    startTime: "2020-06-09T20:15:00-04:00",
    endTime: "2020-06-09T16:00:00-04:00",
  };

  componentDidMount() {
    this.setState({ registrationId: this.props.match.params.id });
  }

  render() {
    return (
      <div className="Suc">
        <div className="Success">
          <h1>Registered Successfully!!!!</h1>
          <h2>Your Registration Id is : {this.state.registrationId}</h2>
          <div
            style={{
              color: "#639fff",
              cursor: "pointer",
              fontSize: "small",
              textDecoration: "underline",
              textTransform: "lowercase",
            }}
          >
            <AddToCalender event={this.event} title="add to calender" />
          </div>
          <button onClick={() => this.props.history.push("/")}>
            RETURN TO HOME
          </button>
          <div style={{ color: "white", fontSize: "small" }}>
            Check your mail for the pass.
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Success);
