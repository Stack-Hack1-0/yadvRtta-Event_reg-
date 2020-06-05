import React, { useState } from "react";
import "./Main.css";
import { Redirect } from "react-router-dom";

const Main = () => {
  const [redirect, setRedirect] = useState(false);

  let renRedirect = null;
  if (redirect) {
    renRedirect = <Redirect to="/register" />;
  }
  return (
    <div className="Main">
      <div className="Register">
        <h1>REGISTER SOON!!!!</h1>
        <button onClick={() => setRedirect(true)}>REGISTER</button>
        {renRedirect}
      </div>
    </div>
  );
};

export default Main;
