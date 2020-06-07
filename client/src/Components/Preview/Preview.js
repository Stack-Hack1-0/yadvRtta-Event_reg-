import React, { Component } from "react";
import "./Preview.css";
import { Redirect } from "react-router-dom";
import Config from "../../assets//config";
//import Image from '../../Utils/Image.js';

class Preview extends Component {
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

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ success: true });
    let url = `${Config.LINK}/event/success/` + this.props.match.params.id;
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((resData) => {})
      .catch((err) => console.log(err));
  };

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
        this.setState({
          name: resData.data.fullname,
          mobile: resData.data.mobile,
          email: resData.data.email,
          regType: resData.data.regType,
          ticket: resData.data.ticket,
          regDate: new Date(resData.data.regDate).toLocaleDateString("en-US"),
          image: Config.LINK + "/" + resData.data.idUrl,
          regId: resData.data._id,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let renNext = null;
    if (this.state.success) {
      renNext = <Redirect to={"/register/" + this.state.regId} />;
    }
    return (
      <div className="Preview">
        <div className="Pre">
          <h2>CONTINUE TO REGISTER!!!</h2>
          <div className="ImageViewer">
            <img
              src={this.state.image}
              alt="id"
              width="250"
              height="250"
              style={{ borderRadius: "20px", margin: "20px" }}
            />
          </div>
          <h1>You have registered on {this.state.regDate}</h1>
          <h1>NAME : {this.state.name}</h1>
          <h1>MOBILE : {this.state.mobile}</h1>
          <h1>e-Mail : {this.state.email}</h1>
          <h1>REGISTRATION-TYPE : {this.state.regType}</h1>
          <h1>TICKETS-BOOKED : {this.state.ticket}</h1>
          <button onClick={this.onSubmit}>CONTINUE</button>
          {renNext}
        </div>
      </div>
    );
  }
}

export default Preview;
