import React, { useEffect, useState } from "react";
import Toolbar from "../Toolbar/Toolbar";
import { withRouter } from "react-router-dom";
const Layout = (props) => {
  const [isAdmin, setAdmin] = useState(window.location.pathname === "/");
  props.history.listen((location, action) => {
    console.log("listended", location.pathname);

    setAdmin(location.pathname === "/");
  });
  return (
    <div style={!isAdmin ? { marginTop: "60px" } : { marginTop: "0" }}>
      <Toolbar isAdmin={isAdmin} />
      {props.children}
    </div>
  );
};

export default withRouter(Layout);
//style={isAdmin ? { marginTop: "60px" } : { marginTop: "0" }}  isAdmin={isAdmin}
