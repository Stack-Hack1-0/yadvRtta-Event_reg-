import React, { Component } from "react";
import "./RegistrationDetails.css";
import Config from "../../assets/config";

class RegistrationDetails extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      mobile: "",
      email: "",
      regType: "",
      regDate: null,
      ticket: null,
      image: null,
      success: false,
      regId: null,
    };
  }

  componentDidMount() {
    let url = `${Config.LINK}/event/preview/` + this.props.match.params.id;
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          name: resData.data.fullname,
          mobile: resData.data.mobile,
          email: resData.data.email,
          regType: resData.data.regType,
          ticket: resData.data.ticket,
          regDate: new Date(resData.data.regDate).toLocaleDateString("en-US"),
          image: Config.Link + "/" + resData.data.idUrl,
          regId: resData.data._id,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="Regd">
        <div className="Reg">
          <h2>Registration Details!!!</h2>
          <div className="ImageViewer">
            <img
              src={this.state.image}
              alt="id"
              width="250"
              height="250"
              style={{ borderRadius: "20px", margin: "20px" }}
            />
          </div>
          <h1>Registered on {this.state.regDate}</h1>
          <h1>NAME : {this.state.name}</h1>
          <h1>MOBILE : {this.state.mobile}</h1>
          <h1>e-Mail : {this.state.email}</h1>
          <h1>REGISTRATION-TYPE : {this.state.regType}</h1>
          <h1>TICKETS-BOOKED : {this.state.ticket}</h1>
        </div>
      </div>
    );
  }
}

export default RegistrationDetails;
