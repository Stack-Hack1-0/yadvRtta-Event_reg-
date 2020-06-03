import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import axios from "axios";
import Styles from "./LoginForm.module.css";
axios.defaults.withCredentials = true;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidMail = () => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!email) return true;
    return email.match(pattern);
  };
  const isValidated = () => {
    return email.length > 0 && password.length > 0 && isValidMail();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/signin",
        {
          email,
          password,
        }
      );
      console.log(res);
    } catch (er) {
      alert(er.response.data.message);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className={Styles.Login}>
      <Form onSubmit={(e) => submitHandler(e)}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!isValidMail()}
          />
          <FormControl.Feedback type="invalid">
            Please provide a valid email
          </FormControl.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button disabled={!isValidated()} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
