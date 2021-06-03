import React from "react";
import "../css/landing-page-style.css";
import Logo from "../images/logo.png";
import BackgroundImage from "../images/landing-background.jpg"

const LandingPage = () => {
  return (
    <div>
      {/* Main landing page view */}
      <h1 className="landing-title">Welcome to the Jefferson Elementary School Admin Portal</h1>
      <div className="landing-container">
        {/* <img src={landingImage} style={{ zIndex: "1", width: "100%" }} /> */}
        <img className="landing-logo" src={Logo} />
        {/* <img className="background-image" src={BackgroundImage}/> */}
      </div>
    </div>
  );
};

export default LandingPage;
