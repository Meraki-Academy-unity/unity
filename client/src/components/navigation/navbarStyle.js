import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Nav = styled.nav`
  background: rgba(0, 0, 0, 0.3);
  height: 80px;
  margin-top: ${({ isHome }) => (isHome ? "-80px" : "")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transitions: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  padding: 0 24px;
  max-width: 1100px;
  width: 100%;
`;

export const NavLogo = styled(LinkR)`
  color: #e8b430;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
  justify-self: flex-start;
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: 80px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;
export const NavLinks = styled(LinkS)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &:active {
    border-bottom: 3px solid #e8b430;
  }

  &:hover {
    color: #e8b430;
    transition: 0.2s ease-in-out;
    border-bottom: 3px solid #e8b430;
  }
`;

export const NavBtn = styled.button`
  display: inline-block;
  align-items: center;
  position: relative;
  background: none;
  border: none;
  outline: none;

  @media screen and (max-width: 768px) {
    display: none;
  }

  &:hover #content {
    display: block;
  }
`;

export const NavServBtn = styled(LinkR)`
  display: inline-block;
  align-items: center;
  position: relative;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: none;
  }

  &:hover #services {
    display: block;
  }
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 2px;
  background: #e8b430;
  color: #fff;
  white-space: nowrap;
  padding: 10px 22px;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #e8b430;
    color: #010606;
  }
`;

export const NavBtnContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const NavDropLinks = styled(LinkR)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #f1f1f1;
  }
`;
