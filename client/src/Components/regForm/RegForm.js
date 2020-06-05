
import React, { Component } from "react";
import "./RegForm.css";
import { Redirect} from 'react-router-dom';
//import axios from "axios";
//import Animate from 'animate.css';

class RegForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      mob: "",
      em: "",
      reg: "",
      tik: 1,
      fle: null,
      previewId: null,
      fetchedAll: false
    };
  }
  componentDidMount(){
      console.log(this.props);
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  fileChangeHandler = (e) => {
    console.log(e.target.files[0], "file");

    let imageFile = e.target.files[0];
    if (!imageFile.name.match(/\.(jpeg|png|PNG|JPEG)$/)) {
      alert("CHOOSE A VALID FILE!!!");
    } else {
      this.setState({
        fle: e.target.files[0],
      });
    }
  }



        
       
    onSubmit=e => {
        e.preventDefault();

        const eventForm = new FormData();
        eventForm.append('name',this.state.name);
        eventForm.append('mob',this.state.mob);
        eventForm.append('em',this.state.em);
        eventForm.append('reg',this.state.reg);
        eventForm.append('tik',this.state.tik);
        eventForm.append('file',this.state.fle)
        console.log(eventForm);
        
        // axios.post('http://localhost:5000/event/submit',{body: eventForm})
        
        let url = 'http://localhost:5000/event/submit';
    fetch(url, {
      method: "POST",
      body: eventForm,
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        console.log(resData.data._id);
        this.setState({previewId: resData.data._id});
        this.setState({fetchedAll: true})
      })
      .catch((err) => console.log(err));
  };

  render() {
    let rnRender = null;
    if(this.state.fetchedAll){
        rnRender = <Redirect to = {"/preview/"+this.state.previewId}/>
    }
    let noOftik = null;
    if (this.state.reg === "self") {
      noOftik = <input type="number" value={this.state.tik} id="tik" />;
    } else {
      noOftik = (
        <input
          type="number"
          value={this.state.tik}
          id="tik"
          onChange={this.onChange}
        />
      );
    }
    return (
        <div className="MainReg">
      <div className="Reg">
        <form>
          <label>FULL NAME:</label>
          <input
            type="text"
            id="name"
            value={this.state.name}
            onChange={this.onChange}
          />
          <label>MOBILE:</label>
          <input
            type="text"
            id="mob"
            value={this.state.mob}
            onChange={this.onChange}
          />
          <label>E-mail:</label>
          <input
            type="text"
            id="em"
            value={this.state.em}
            onChange={this.onChange}
          />
          <label>UPLOAD YOUR ID:</label>
          <input
            style={{ fontFamily: "monospace", fontWeight: "bold" }}
            type="file"
            name="file"
            onChange={this.fileChangeHandler}
          />
          <label>REGISTRATION-TYPE:</label>
          <select value={this.state.reg} id="reg" onChange={this.onChange}>
            <option value="select">SELECT</option>
            <option value="self">SELF</option>
            <option value="group">GROUP</option>
            <option value="corporate">CORPORATE</option>
            <option value="others">OTHERS</option>
          </select>
          <label>NO OF TICKETS:</label>
          {noOftik}
          <button onClick={this.onSubmit}>SUBMIT</button>
          {rnRender}
        </form>
      </div>
      </div>
    );
  }
}

export default RegForm;