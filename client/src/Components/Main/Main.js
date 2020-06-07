import React, { useState } from "react";
import "./Main.css";
import { Redirect } from "react-router-dom";
import Timer from "../Timer/Timer";

const Main = () => {
  const [redirect, setRedirect] = useState(false);

  let renRedirect = null;
  if (redirect) {
    renRedirect = <Redirect to="/register" />;
  }
  return (
    <div className="Main">
      <div className="Register">
        <div className="contain">
          <h2 style={{ color: "#ffebb5" }}>YadVrtta to boost your Skill</h2>
          <h1 style={{ color: "#ffebb5" }}>REGISTER SOON!!</h1>
          <Timer />
          <button onClick={() => setRedirect(true)}>REGISTER</button>
        </div>
        {renRedirect}
      </div>
    </div>
  );
};

export default Main;
