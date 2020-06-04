import React, { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import LoginForm from "../LoginForm/LoginForm";
import Chart from "../Chart/Chart";
import FieldContainer from "../FieldContainer/FieldContainer";
import Styles from "./Admin.module.css";

const Admin = () => {
  const [isLoggedin, setLoggedin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [fieldType, setFieldType] = useState("all");

  const getLogin = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/admin/isLoggedin"
      );
      if (res.data.isLoggedin) {
        console.log("login");
        setLoggedin(true);
      }
    } catch (er) {}
    setLoading(false);
  };

  useEffect(() => {
    getLogin();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  if (!isLoggedin) {
    return <LoginForm submitHandler={() => setLoggedin(true)} />;
  }
  return (
    <div className={Styles.admin}>
      <Chart setType={(val) => setFieldType(val)} />
      <FieldContainer type={fieldType} setType={(val) => setFieldType(val)} />
    </div>
  );
};

export default Admin;
