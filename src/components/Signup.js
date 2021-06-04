import React, {useState} from 'react';
import { useAuth } from '../context/AuthContext';
import Logo from '../images/logo.png';
import {
    Button,
    TextField,
    Typography,
    makeStyles,
    Container,
    Snackbar
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
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const username = e.target["email-input"].value;
    const password = e.target["password-input"].value;
    const confirm = e.target["password-confirm-input"].value;
    e.target["email-input"].value = "";
    e.target["password-input"].value = "";
    e.target["password-confirm-input"].value = "";
    if(password !== confirm){
        setSnackOpen(true)        
        return;
    }
    try{
        await signup(username, password)
        setLoading(true)//disable button to prevent multiple account creation
    }catch(err){
        console.log("Failed to create account. Error: ", err)
    }
    setLoading(false)
  }

  return (
      <Container maxWidth="xs">
          <Snackbar
            anchorOrigin={{vertical:'top', horizontal:'center'}}
            open={snackOpen}
            onClose={()=>{setSnackOpen(false)}}
            message="Passwords do not match"
          />
              
        <div className={classes.paper}>
          <img className={classes.logo} src={Logo}/><br/>
          <Typography variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                id="email-input"
                type="email"
                variant="outlined"
                label="Email"
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
             <TextField
                id="password-confirm-input"
                variant="outlined"
                label="Confirm Password"
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
                  Create Account
              </Button>
          </form>
        </div>
      </Container>
  );
}