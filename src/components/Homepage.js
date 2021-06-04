import React from 'react';
import Logo from '../images/logo.png';
import {
    Button,
    TextField,
    Typography,
    makeStyles,
    Container
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10%'
  },
  form: {
    width: '100%'
  },
  login: {
      marginTop: '10px',
      marginBottom: '10px',
      backgroundColor:"#FFBC19",
      fontFamily: "Montserrat",
      fontWeight:"bold",
  },
  signup:{
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor:"#0066b3",
    fontFamily: "Montserrat",
    fontWeight:"bold",
    color:"white"
  },
  logo: {
      width: '50%',
      height: '50%'
  }
}));

export default function Login() {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <img className={classes.logo} src={Logo}/><br/>
        <Typography variant="h5">
          Log In
        </Typography>
        <form className={classes.form}>
            <TextField
            variant="outlined"
            label="Username"
            required
            fullWidth
            margin="normal"
            autoFocus
            />
            <TextField
            variant="outlined"
            label="Password"
            required
            fullWidth
            margin="normal"
            />
            <Button
                className={classes.login}
                type="submit"
                variant="contained"
                fullWidth
            >
                Log In
            </Button>
            <Button
                className={classes.signup}
                type="submit"
                variant="contained"
                fullWidth
            >
            Sign Up
        </Button>
        </form>
      </div>
    </Container>
  );
}