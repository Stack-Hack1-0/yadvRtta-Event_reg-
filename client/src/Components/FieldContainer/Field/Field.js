import React from "react";
import Styles from "./Field.module.css";

const Field = (props) => {
  return (
    <div
      className={Styles.field}
      onClick={() =>
        window.open(
          `http://localhost:3001/registration-details/${props.regdNo}`
        )
      }
    >
      <div>{props.regdNo}</div>
      <div>{props.regDate}</div>
      <div>{props.name}</div>
    </div>
  );
};

export default Field;
