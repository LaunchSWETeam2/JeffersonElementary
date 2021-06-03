import React from "react";
import "../css/landing-page-style.css";
import Logo from "../images/logo.png";

const LandingPage = () => {
  return (
    <div>
      {/* Main landing page view */}
      <div className="landing-container">
        {/* <img src={landingImage} style={{ zIndex: "1", width: "100%" }} /> */}
        <h1>Welcome to the Jefferson Elementary School Admin Portal</h1>
        <img className="landing-logo" src={Logo} />
      </div>
    </div>
  );
};

export default LandingPage;
