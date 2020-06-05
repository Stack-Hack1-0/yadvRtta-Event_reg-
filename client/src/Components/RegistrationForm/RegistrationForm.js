import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import Styles from "./RegistrationForm.module.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
const RegistrationForm = (props) => {
  //state

  const [name, setName] = useState("");
  const [mob, setMob] = useState("");
  const [em, setEm] = useState("");
  const [reg, setReg] = useState("self");
  const [tik, setTik] = useState(1);
  const [fle, setFle] = useState(undefined);
  const [preveiewId, setPreview] = useState();

  //validation
  const isValidName = () => {
    if (name.length === 0) return true;
    return name.length > 0;
  };
  const isValidMail = () => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (em.length === 0) return true;
    return em.match(pattern);
  };
  const isValidMobile = () => {
    const pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (mob.length === 0) return true;
    return mob.match(pattern);
  };
  const isValidFile = () => {
    if (!fle) return false;
    console.log(fle);
    return fle.name.match(/\.(jpeg|png|PNG|JPEG)$/);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventForm = new FormData();
    eventForm.append("name", name);
    eventForm.append("mob", mob);
    eventForm.append("em", em);
    eventForm.append("reg", reg);
    eventForm.append("tik", tik);
    eventForm.append("file", fle);
    console.log(eventForm);
    const data = {
      mob,
      em,
      reg,
      file: fle,
      tik,
      name,
    };
    console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:5000/event/submit",
        eventForm
      );
      setPreview(res.data.data._id);
    } catch (er) {
      console.log(er);
    }
  };

  const isDisabled = () => {
    return isValidFile() && isValidMail() && isValidName() && isValidMobile();
  };

  if (preveiewId) return <Redirect to={"/preview/" + preveiewId} />;

  return (
    <div className={Styles.container}>
      <Form onSubmit={handleSubmit}>
        <Form.Label style={{ fontWeight: "bold", fontSize: "large" }}>
          Register to generate a Pass
        </Form.Label>
        <Form.Group controlId="name">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            required
            autoFocus
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!isValidName}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formMobile">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your mobile no."
            isInvalid={!isValidMobile()}
            value={mob}
            onChange={(e) => setMob(e.target.value)}
          />
          <FormControl.Feedback type="invalid">
            Please provide a valid mobile no.
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your Email"
            isInvalid={!isValidMail()}
            value={em}
            onChange={(e) => setEm(e.target.value)}
          />
          <FormControl.Feedback type="invalid">
            Please provide a valid email.
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group controlId="uploadId" style={{ margin: "auto" }}>
          <Form.Label>Upload Your Id</Form.Label>
          <Form.File
            style={{ margin: "auto", width: "220px" }}
            required
            name="file"
            label="File"
            isInvalid={!isValidFile()}
            onChange={(e) => setFle(e.target.files[0])}
            feedback="file should be jpeg|png|PNG|JPEG"
            // value={fle}
          />
          <FormControl.Feedback type="invalid">
            Please provide a valid file.
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Select registration Type</Form.Label>
          <Form.Control
            as="select"
            value={reg}
            onChange={(e) => setReg(e.target.value)}
            custom
          >
            <option value="self">SELF</option>
            <option value="group">GROUP</option>
            <option value="corporate">CORPORATE</option>
            <option value="others">OTHERS</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>No of tickets</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter no. of tickets"
            value={tik}
            onChange={(e) => setTik(e.target.value)}
            isInvalid={!(tik > 0)}
          />
          <FormControl.Feedback type="invalid">
            Min ticket allowed 1
          </FormControl.Feedback>
        </Form.Group>
        <Button disabled={!isDisabled()} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;
