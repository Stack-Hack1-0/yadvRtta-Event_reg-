import React, { useEffect, useState } from "react";
import Toolbar from "../Toolbar/Toolbar";
import { withRouter } from "react-router-dom";
const Layout = (props) => {
  const [isAdmin, setAdmin] = useState(window.location.pathname === "/");
  const [admin, setmin] = useState(window.location.pathname === "/admin");
  props.history.listen((location, action) => {
    console.log("listended", location.pathname);

    setAdmin(location.pathname === "/");
    setmin(location.pathname === "/admin");
  });
  return (
    <div style={!isAdmin ? { marginTop: "60px" } : { marginTop: "0" }}>
      <Toolbar isAdmin={isAdmin} isLoggedin={props.isLoggedin} ismin={admin} />
      {props.children}
    </div>
  );
};

export default withRouter(Layout);
//style={isAdmin ? { marginTop: "60px" } : { marginTop: "0" }}  isAdmin={isAdmin}
