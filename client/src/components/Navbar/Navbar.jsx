import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import logo from '../../images/blog.png';

function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser(null);
  };

  useEffect(() => {
    // check for JWT if doing manual signup
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          PWABook
        </Typography>
        <img className={classes.image} src={logo} alt="PWABook" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture}>
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button variant="contained" className={classes.logout} colour="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" className={classes.logout} colour="primary">
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
