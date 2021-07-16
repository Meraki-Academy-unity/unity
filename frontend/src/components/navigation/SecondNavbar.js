import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../reducers/login";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  NavBtnContent,
  NavDropLinks,
} from "./SecNavbarStyle";
import { FaBars } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

const SecNavigation = ({ toggle }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  const logout = () => {
    localStorage.clear();
    dispatch(setToken(""));
  };
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          <h2>Travelio</h2>
        </NavLogo>
        <MobileIcon onClick={toggle}>
          <FaBars />{" "}
        </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavLinks to="/">Home</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/Activities">Activities</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/Plans">Travel Plans</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/match">Matches</NavLinks>
          </NavItem>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/">
            <FaUserAlt />
          </NavBtnLink>
          {state.token ? (
            <NavBtnContent id="content">
              <NavDropLinks to="/Profile">Profile</NavDropLinks>
              <NavDropLinks to="/Inbox">Inbox</NavDropLinks>
              <NavDropLinks to="/Notifications">Notifications</NavDropLinks>
              <NavDropLinks to="/" onClick={logout}>
                Logout
              </NavDropLinks>
            </NavBtnContent>
          ) : (
            <NavBtnContent id="content">
              <NavDropLinks to="/login">Sign in</NavDropLinks>
              <NavDropLinks to="/register">Sign up</NavDropLinks>
            </NavBtnContent>
          )}
        </NavBtn>
      </NavbarContainer>
    </Nav>
  );
};

export default SecNavigation;
