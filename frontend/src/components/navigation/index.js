import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
import world from "./world.png";
import menu from "./menu.png";
import close from "./close.png";

const Navigation = ({ token, setToken, name }) => {
  const [showLinks, setShowLinks] = useState(false);
  const [isShowed, setIsShowed] = useState(false);
  const logout = () => {
    localStorage.clear();
    setToken("");
  };
  return (
    <div className="navContainer">
      <div className="navBar">
        <div className="leftSide">
          <img src={world} alt="" />
          <span>Traveler</span>
        </div>
        <div className="rightSide">
          {isShowed ? (
            <Link
              className="hideLinks"
              onClick={() => {
                setShowLinks(false);
                setIsShowed(false);
              }}
            >
              <img src={close} />
            </Link>
          ) : (
            <Link
              className="showLinks"
              onClick={() => {
                setShowLinks(true);
                setIsShowed(true);
              }}
            >
              <img src={menu} />
            </Link>
          )}
          ;
          <div className="links" id={showLinks ? "hidden" : ""}>
            {token ? (
              <>
                <Link className="link" to="/Profile">
                  Profile
                </Link>
                <Link className="link" to="/Inbox">
                  Inbox
                </Link>
                <Link className="link" to="/" onClick={logout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="link" to="/login">
                  Login
                </Link>
                <Link className="link" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
	  <div className="navBar">
        <div className="middleSide">
          <div className="links1" >
              <>
			  <Link className="link" to="/Home">
                  Home
                </Link>
                <Link className="link" to="/Activities">
                  Activities
                </Link>
                <Link className="link" to="/Plans">
                  Travel Plans
                </Link>
                <Link className="link" to="/contactUs" >
                  Contact us
                </Link>
              </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
