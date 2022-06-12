import { Fragment, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

import classes from "./Layout.module.scss";

import RestContext from "../../store/rest-context";

const Layout = (props) => {
  const ctx = useContext(RestContext);

  return (
    <Fragment>
      <header
        className={`${classes.header} ${
          ctx.isDarkMode ? classes["bg-dark-head"] : classes.bg_white
        }`}
      >
        <h1>Where in the world?</h1>

        <div
          className={classes.toggleLight}
          onClick={(e) => {
            if (ctx.isDarkMode) {
              ctx.setIsDarkMode(false);
            } else {
              ctx.setIsDarkMode(true);
            }
          }}
        >
          {ctx.isDarkMode ? (
            <FontAwesomeIcon icon={faSun} className={classes.day_logo} />
          ) : (
            <FontAwesomeIcon icon={faMoon} className={classes.day_logo} />
          )}
          <p>{ctx.isDarkMode ? "Light Mode" : "Dark Mode"}</p>
        </div>
      </header>
      <main
        className={`${classes.main} ${
          ctx.isDarkMode ? classes["bg-dark-body"] : classes["bg-light"]
        }`}
      >
        {props.children}
      </main>
    </Fragment>
  );
};

export default Layout;
