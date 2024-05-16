import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useRoutes } from "react-router-dom";
import LoginProtector from "./routeguards/LoginProtector";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            // <LoginProtector>
            // {" "}
            <Landing />
            // {" "}
            // </LoginProtector>
          }
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
