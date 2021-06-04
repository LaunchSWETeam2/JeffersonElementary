import React from "react";
import "../css/landing-page-style.css";
import Logo from "../images/logo.png";
import BackgroundImage from "../images/landing-background.jpg";
import { Paper, Container, Card, Typography, Link } from "@material-ui/core";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div>
      {/* Main landing page view */}
      <h1 className="landing-title">
        Welcome to the Jefferson Elementary School Admin Portal
      </h1>
      <div className="landing-container">
        {/* <img src={landingImage} style={{ zIndex: "1", width: "100%" }} /> */}
        <img className="landing-logo" src={Logo} />
        {/* <img className="background-image" src={BackgroundImage}/> */}
        <Paper
          className="mission"
          elevation={3}
          style={{
            position: "relative",
            backgroundColor: "#28282b",
            width: "95%",
            height: "50%",
            top: "-70px",
            background: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <h1
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: "30px",
              color: "#FFF8DC",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            At the Thomas Jefferson Elementary School, we are a diverse
            community of global citizens and lifelong learners that lead by
            example. We believe in the power of positivity, respect, and
            cooperation. We manifest our potential through confidence and work
            ethic. <br />
            <br />
            Here at Jefferson, we value Positivity, Respect, Diversity,
            Education, and Comradery.
          </h1>
        </Paper>
      </div>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            1609 University Ave, Charlottesville, VA 22903 <br />
            434-293-4402 <br />
            contactus@tjes.edu
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
