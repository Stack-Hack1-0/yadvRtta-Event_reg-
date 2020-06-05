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
    title: "Event Name",
    description: "Event Description",
    location: "Portland, OR",
    startTime: "2020-06-16T20:15:00-04:00",
    endTime: "2020-06-16T21:45:00-04:00",
  };

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
          <a
            style={{
              color: "blue",
              cursor: "pointer",
              margin: "5px",
              textDecoration: "underline",
            }}
          >
            <AddToCalender event={this.event} title="add to calender" />
          </a>
          <button onClick={() => this.props.history.push("/")}>
            RETURN TO HOME
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Success);
