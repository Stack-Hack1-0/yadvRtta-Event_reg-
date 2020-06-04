import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import axios from "axios";
import Styles from "./LoginForm.module.css";
axios.defaults.withCredentials = true;

const Login = (props) => {
  const [user, setuser] = useState("");
  const [password, setPassword] = useState("");

  // const isValidMail = () => {
  //   const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  //   if (!user) return true;
  //   return user.match(pattern);
  // };
  const isValidated = () => {
    return user.length > 0 && password.length > 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/admin/signin",
        {
          user,
          password,
        }
      );
      console.log(res);
      if (res && res.data.status === "success") props.submitHandler();
    } catch (er) {
      alert(er.response.data.message);
    }
    setuser("");
    setPassword("");
  };

  return (
    <div className={Styles.Login}>
      <Form onSubmit={(e) => submitHandler(e)}>
        <Form.Group controlId="user">
          <Form.Label>User name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            placeholder="Enter user"
            value={user}
            onChange={(e) => setuser(e.target.value)}
            // isInvalid={!isValidMail()}
          />
          <FormControl.Feedback type="invalid">
            Please provide a valid user
          </FormControl.Feedback>
          <Form.Text className="text-muted">
            We'll never share your user with anyone else.
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
