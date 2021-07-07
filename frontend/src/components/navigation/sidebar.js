import React from "react";
import { SidebarContainer, Icon, CloseIcon } from "./sidebarStyle";
import {
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SideBtnWrap,
  SidebarRoute,
  SidebarDropMenu,
  SidebarDropCont,
  SidebarRegRoute,
  SidebarDropLink
} from "./sidebarStyle";

function Sidebar({ toggle, isOpen }) {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/Home" onClick={toggle}>
            Home
          </SidebarLink>
          <SidebarLink to="/About" onClick={toggle}>
            About
          </SidebarLink>
          <SidebarLink to="/" onClick={toggle}>
            <SidebarDropMenu>
              <SidebarLink to="/">Services</SidebarLink>
              <SidebarDropCont id="cont">
                <SidebarDropLink to="/Activities">Activities</SidebarDropLink>
                <SidebarDropLink to="/Plans">Travel Plans</SidebarDropLink>
                <SidebarDropLink to="/Matches">Matches</SidebarDropLink>
              </SidebarDropCont>
            </SidebarDropMenu>
          </SidebarLink>
          <SidebarLink to="/contactUs" onClick={toggle}>
            Contact us
          </SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/login">Sign In</SidebarRoute>
          <SidebarRegRoute to="/register">Sign Up</SidebarRegRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
