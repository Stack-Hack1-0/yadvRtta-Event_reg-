import React from "react";
import Styles from "./Toolbar.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";
import NavigationItem from "./NavigationItems/NavigationItem/NavigationItem";
import Logo from "../Logo/Logo";

const Toolbar = (props) => {
  console.log(props.isAdmin);
  return (
    <header
      className={Styles.Toolbar}
      style={
        !props.isAdmin
          ? { backgroundColor: "#808387" }
          : { backgroundColor: "transparent" }
      }
    >
      <nav>
        <NavigationItem link="/">
          <Logo />
        </NavigationItem>
      </nav>
      <nav>
        <NavigationItems
          showNav={props.show}
          isLoggedin={props.isLoggedin}
          ismin={props.ismin}
        />
      </nav>
    </header>
  );
};

export default Toolbar;
// style={
// props.isAdmin
// ? { backgroundColor: "dimgray" }
// : { backgroundColor: "tranparent" }
// }
