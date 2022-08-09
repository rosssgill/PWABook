import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";
import logo from "../../images/blog.png";

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          PWABook
        </Typography>
        <img className={classes.image} src={logo} alt="PWABook" height="60" />
      </div>
    </AppBar>
  );
};

export default Navbar;
