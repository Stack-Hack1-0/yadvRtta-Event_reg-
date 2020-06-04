import React from "react";
import Styles from "./FieldWrapper.module.css";

const FieldWrapper = (props) => {
  return <div className={Styles.wrapper}>{props.children}</div>;
};

export default FieldWrapper;
