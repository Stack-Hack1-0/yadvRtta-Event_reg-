import React, { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import LoginForm from "../LoginForm/LoginForm";
import Chart from "../Chart/Chart";
import FieldContainer from "../FieldContainer/FieldContainer";
import Styles from "./Admin.module.css";

const Admin = (props) => {
  const [fieldType, setFieldType] = useState("all");

  if (props.isLoading) {
    return <Spinner />;
  }
  if (!props.isLoggedin) {
    return <LoginForm submitHandler={() => props.setLoggedin()} />;
  }
  return (
    <div className={Styles.admin}>
      <Chart setType={(val) => setFieldType(val)} />
      <FieldContainer type={fieldType} setType={(val) => setFieldType(val)} />
    </div>
  );
};

export default Admin;
