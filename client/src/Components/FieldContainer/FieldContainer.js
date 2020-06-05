import React, { useState, useEffect } from "react";
import FieldWrapper from "./FieldWrapper/FieldWrapper";
import Styles from "./FieldContainer.module.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

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

const FieldContainer = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/v1/admin/submissions/${props.type.toLowerCase()}`
    );
    console.log(res);
    setData(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [props]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={Styles.container}>
      <div>
        {
          <select
            id="cars"
            name="cars"
            onChange={(e) => {
              props.setType(e.target.value);
            }}
            value={props.type.toLowerCase()}
          >
            <option value="all">All</option>
            <option value="self">Self</option>
            <option value="group">Group</option>
            <option value="corporate">Corporate</option>
            <option value="others">Others</option>
          </select>
        }
      </div>
      <div className={Styles.header}>
        <div>registration no.</div>
        <div>date</div>
        <div>name</div>
      </div>
      <FieldWrapper>
        {data.map((el) => {
          return (
            <Field
              key={el._id}
              regdNo={el._id}
              regDate={el.regDate.slice(0, 10)}
              name={el.fullname.split(" ")[0]}
            />
          );
        })}
      </FieldWrapper>
    </div>
  );
};

export default FieldContainer;
