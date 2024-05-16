import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { GeneralContext } from "../api/GeneralContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const usertype = localStorage.getItem("userType");

  const { logout } = useContext(GeneralContext);
  return (
    <>
      <div className="navbar">
        {!usertype ? (
          <>
            <h3>SB Stocks</h3>

            <div className="nav-options">
              <ul>
                <li className="header-li">
                  <a href="#home">Home</a>
                </li>
                <li className="header-li">
                  <a href="#about">About</a>{" "}
                </li>
                <li className="header-li">
                  <a href="#home">Join now</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            {usertype === "customer" ? (
              <>
                <h3>SB Stocks</h3>

                <div className="nav-options">
                  <p onClick={() => navigate("/")}>Watchlist 1</p>
                  <p onClick={() => navigate("/")}>Watchlist 2</p>
                  <p onClick={() => navigate("/")}>Watchlist 3</p>
                  <p onClick={logout}>Logout</p>
                  <p onClick={() => navigate("/")}></p>
                </div>
              </>
            ) : usertype === "admin" ? (
              <>
                <h3>SB Stocks (Admin)</h3>
                <div className="nav-options">
                  <p onClick={() => navigate("/")}>Watchlist 1</p>
                  <p onClick={() => navigate("/")}>Watchlist 2</p>
                  <p onClick={() => navigate("/")}>Watchlist 3</p>
                  <p onClick={() => navigate("/")}></p>
                  {/* <p onClick={logout}>Logout</p> */}
                </div>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
