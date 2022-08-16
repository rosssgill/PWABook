import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import logo from '../../images/blog.png';
import urlBase64ToUint8Array from '../../util';
import * as api from '../../api';

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

  const displayConfirmNotification = () => {
    if ('serviceWorker' in navigator) {
      const options = {
        body: 'You successfuly subscribed to the push notification service.',
        icon: '/src/images/icons/app-icon-96x96.png',
        image: '/src/images/sf-boat.jpg',
        dir: 'ltr',
        lang: 'en-GB', // BCP-47
        vibrate: [100, 50, 200],
        badge: '/src/images/icons/app-icon-96x96.png',
        tag: 'confirm-notification',
        renotify: false,
        actions: [
          { action: 'confirm', title: 'Okay', icon: '/src/images/icons/app-icon-96x96.png' },
          { action: 'cancel', title: 'Cancel', icon: '/src/images/icons/app-icon-96x96.png' },
        ],
      };
      navigator.serviceWorker.ready.then((swreg) => {
        swreg.showNotification('[Service Worker] Successfully subscribed to push notifications!', options);
      });
    }
  };

  const configurePushSubscription = () => {
    let reg;

    navigator.serviceWorker.ready
      .then((swreg) => {
        reg = swreg;
        return swreg.pushManager.getSubscription();
      })
      .then((sub) => {
        if (sub === null) {
          console.log('Making new subscription');
          // eslint-disable-next-line operator-linebreak
          const vapidPublicKey =
            'BH3ZQxUdEIciu6Kz6Tiq7udXG1LiBMgEELig2eMNQzaJnHbLv8Nd0zbgquA7XP-N6SW8gCXFQWl_9NmK2OP1BRQ';
          const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
          // Create new subscription
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          });
        }
        return null;
      })
      .then((newSub) => {
        if (newSub !== null) {
          console.log(newSub);
          api.subscribe(newSub);
          displayConfirmNotification();
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      <Button variant="contained" onClick={configurePushSubscription}>
        Get Push Notifications
      </Button>
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
