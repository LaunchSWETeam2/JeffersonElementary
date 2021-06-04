import React, {useState} from 'react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)

  const handleSubmit = async(e) =>{
    setSnackOpen(false)
    e.preventDefault()
    const email = e.target["email-input"].value;
    const password = e.target["password-input"].value;
    e.target["email-input"].value = "";
    e.target["password-input"].value = "";
    try {
      setLoading(true)
      await login(email, password)
    }catch(err){
      setSnackOpen(true)
      console.log("Failed to login. Error: ", err)
    }
    setLoading(false)
  }
  return (
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <img className={classes.logo} src={Logo}/><br/>
          <Typography variant="h5">
            Log In
          </Typography>
          { snackOpen &&
            <div className="login-fail">
              Failed to login
            </div>
          }
          <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                id="email-input"
                variant="outlined"
                label="Email"
                type="email"
                required
                fullWidth
                margin="normal"
                autoFocus
              />
              <TextField
                id="password-input"
                variant="outlined"
                label="Password"
                required
                fullWidth
                margin="normal"
                type="password"
              />
              <Button
                  className={classes.login}
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
              >
                  Log In
              </Button>
              <Button
                  className={classes.signup}
                  onClick={()=>history.push('/signup')}
                  variant="contained"
                  fullWidth
                  disabled={loading}
              >
              Sign Up
          </Button>
          </form>
        </div>
      </Container>
  );
}