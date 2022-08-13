import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';

import Input from './Input';
import useStyles from './styles';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

function Auth() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignedUp) {
      dispatch(signin(formData, navigate)); // Passing navigate so we can navigate when something happens
    } else {
      dispatch(signup(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchForm = () => {
    setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
    handleShowPassword(false);
  };

  const googleSuccess = async (response) => {
    const token = response.credential;
    const result = decode(token);

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log('error with google login');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignedUp ? 'Sign in' : 'Sign up'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!isSignedUp && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {!isSignedUp ? (
              <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
            ) : null}
          </Grid>
          <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {!isSignedUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchForm}>
                {isSignedUp ? 'Need an account? Make one here' : 'Already have an account? Sign In'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
