import React, { useState } from "react";
import "../styles/Landing.css";
import { Container, Typography } from "@mui/material";
import Login from "../components/Login";
import Register from "../components/Register";
import Navbar from "../components/Navbar";
import HeroImg from "../assets/home-hero-img.png";
import About1 from "../assets/about1.jpg";
import About2 from "../assets/about2.jpg";

const Landing: React.FC = () => {
  const [isLoginBox, setIsLoginBox] = useState<boolean>(true);

  return (
    <>
      <Container className="landingPage" maxWidth="xl">
        <div className="landing-body">
          <div className="landing-hero" id="home">
            <div className="landing-hero-content">
              <Typography variant="h1">SB Stock Trading</Typography>
              <Typography variant="body1">
                Experience seamless stock market trading with our user-friendly
                platform, offering real-time data, advanced analytics, and swift
                execution to empower traders and investors alike.
              </Typography>
              <div className="authentication-form">
                {isLoginBox ? (
                  <Login setIsLoginBox={setIsLoginBox} />
                ) : (
                  <Register setIsLoginBox={setIsLoginBox} />
                )}
              </div>
            </div>
            <div className="landing-hero-image">
              <img src={HeroImg} alt="" />
            </div>
          </div>
          <div className="landing-about" id="about">
            <div className="about-1">
              <img src={About1} alt="" />
              <div className="about-1-content">
                <Typography variant="h3">Real-Time Data</Typography>
                <Typography variant="body1">
                  Gain a competitive edge with lightning-fast access to
                  real-time market data, keeping you ahead of every market
                  movement. Stay on top of price fluctuations and trends with
                  up-to-the-minute updates. Make timely and informed decisions
                  with our cutting-edge data delivery. Elevate your trading game
                  with our unparalleled real-time data solutions.
                </Typography>
                <a href="#home">Join now!!</a>
              </div>
            </div>
            <div className="about-2">
              <div className="about-2-content">
                <Typography variant="h3">Portfolio Management</Typography>
                <Typography variant="body1">
                  Effortlessly manage your investments using our comprehensive
                  portfolio management tools, enabling seamless organization and
                  optimization. Stay informed about your portfolio's performance
                  with advanced tracking capabilities. Mitigate risks
                  effectively with our integrated risk assessment features. Take
                  full control of your financial future with our user-friendly
                  and powerful portfolio management solutions.
                </Typography>
                <a href="#home">Join now!!</a>
              </div>
              <img src={About2} alt="" />
            </div>
          </div>
          <div className="footer">
            <Typography variant="body2">
              All rights reserved - &#169; SB-Stocks.com
            </Typography>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Landing;
