import React, { useState, useEffect } from "react";
import FieldWrapper from "./FieldWrapper/FieldWrapper";
import Styles from "./FieldContainer.module.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import Field from "./Field/Field";
import Head from "./Head/Head";
import Config from "../../assets/config";

const FieldContainer = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  let sub = true;
  const getData = async () => {
    const res = await axios.get(
      `${Config.LINK}/admin/submissions/${props.type.toLowerCase()}`
    );
    console.log(res);
    if (sub) {
      setData(res.data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      sub = false;
    };
  }, [props]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={Styles.container}>
      <Head length={data.length} setType={props.setType} type={props.type} />
      <div className={Styles.header}>
        <div>registration no.</div>
        <div>date</div>
        <div>name</div>
      </div>
      <FieldWrapper>
        {data.length > 0 ? (
          data.map((el) => {
            return (
              <Field
                key={el._id}
                regdNo={el._id}
                regDate={el.regDate.slice(0, 10)}
                name={el.fullname.split(" ")[0]}
              />
            );
          })
        ) : (
          <div>No one registered yet</div>
        )}
      </FieldWrapper>
    </div>
  );
};

export default FieldContainer;
