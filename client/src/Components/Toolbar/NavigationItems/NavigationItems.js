import React from "react";
import Styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
//import Logo from "../../Logo/Logo";

const navigationItems = (props) => (
  <div
    className={Styles.NavigationItems}
    style={props.showNav ? { display: "none" } : null}
  >
    <NavigationItem link="/" exact>
      HOME
    </NavigationItem>
    <NavigationItem link="/register" exact>
      REGISTER
    </NavigationItem>
    {props.ismin && props.isLoggedin ? (
      <NavigationItem link="/logout" exact>
        LOGOUT
      </NavigationItem>
    ) : (
      <NavigationItem link="/admin" exact>
        ADMIN
      </NavigationItem>
    )}

    {/* <NavigationItem link="/radio" exact>
      RADIO
    </NavigationItem>
    <NavigationItem link="/my-music" exact>
      MY MUSIC
    </NavigationItem>
    <NavigationItem link="/season" exact>
      SHOWS & PODCASTS
    </NavigationItem> */}
  </div>
);

export default navigationItems;
