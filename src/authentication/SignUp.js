import React, { useEffect, useState } from 'react';
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Button,
  Grid,
  Link,
  makeStyles,
  Card,
  CardContent,
} from '@material-ui/core';
import { LockRounded } from '@material-ui/icons';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import fire from '../helpers/db';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'firebase/auth';
import 'firebase/firestore';

const SignUp = (props) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassowerd = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSignUp = () => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        fire
          .firestore()
          .collection('users')
          .doc(fire.auth().currentUser.uid)
          .set({ firstName, lastName, email });
        console.log(response);
        if (response) {
          props.toggle();
          toast.success('User Registered Successfully');
        }
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.error(error.message);
            break;
          case 'auth/invalid-email':
            toast.error(error.message);
            break;
          case 'auth/weak-password':
            toast.error(error.message);
            break;
        }
      });
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
    return () => {
      ValidatorForm.removeValidationRule('isPasswordMatch');
    };
  }, [password]);

  return (
    <Container component="main" maxWidth="xs">
      <Card className={classes.card}>
        <CardContent>
          <ToastContainer />
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockRounded />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <ValidatorForm onSubmit={handleSignUp} className={classes.form}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="First name"
                onChange={handleFirstName}
                name="firstName"
                value={firstName}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete="off"
              />
              {/* <br /> */}
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Last name"
                onChange={handleLastName}
                name="lastName"
                value={lastName}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete="off"
              />
              {/* <br /> */}
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email"
                onChange={handleEmail}
                name="email"
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                autoComplete="off"
              />
              <br />
              <TextValidator
                variant="outlined"
                fullWidth
                label="Password"
                onChange={handlePassword}
                name="password"
                type="password"
                value={password}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete="off"
              />
              <br />
              <TextValidator
                variant="outlined"
                label="Confirm password"
                fullWidth
                onChange={handleConfirmPassowerd}
                name="confirmPassword"
                type="password"
                validators={['isPasswordMatch', 'required']}
                errorMessages={['password mismatch', 'this field is required']}
                value={confirmPassword}
                autoComplete="off"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    onClick={props.toggle}
                    className={classes.pointer}
                    variant="body2"
                  >
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
            </ValidatorForm>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    background: 'linear-gradient(45deg, #733BC3 30%, #C64156 90%)',
    margin: theme.spacing(3, 0, 2),
    color: '#fff',
  },
  card: {
    marginTop: '60px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '20px',
  },
  pointer: {
    cursor: 'pointer',
    color: 'red',
  },
}));

export default SignUp;
