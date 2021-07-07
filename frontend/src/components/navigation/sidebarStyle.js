import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { Link as LinkS } from "react-scroll";
import { Link as LinkR } from "react-router-dom";

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

export const CloseIcon = styled(FaTimes)`
  color: #fff;
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: #fff;
`;


export const SidebarLink = styled(LinkS)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #e8b430;
    transition: 0.2s ease-in-out;
  }
`;

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction:column;
  align-items:center;
  gap:5px;
`;

export const SidebarRoute = styled(LinkR)`
  border-radius: 50px;
  background: #e8b430;
  padding: 16px 64px;
  white-space: nowrap;
  color: #010606;
  outline: none;
  border: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

export const SidebarMenu = styled.ul`
  display: grid;
  grid-template-column: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;

  @media screen and (max-width: 768px) {
    grid-template-rows: repeat(6, 60px);
  }
`;


export const SidebarDropMenu=styled(LinkR)`
display: inline-block;
align-items: center;
justify-content: center;
font-size: 1.5rem;
text-decoration: none;
transition: 0.2s ease-in-out;
color: #fff;
cursor: pointer;

&:hover {
  color: #01bf71;
  transition: 0.2s ease-in-out;
}

&:hover #cont{
  display:block;
 }
`

export const SidebarDropCont=styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`

export const SidebarRegRoute=styled(LinkR)`
color:#fff;
`

export const SidebarDropLink=styled(LinkS)`
display: flex;
align-items: center;
justify-content: center;
font-size: 1.2rem;
text-decoration: none;
transition: 0.2s ease-in-out;
color: #000;
cursor: pointer;
margin:5px;

&:hover {
  transition: all 0.2s ease-in-out;
  background-color: #DCDCDC;
  color: #010606;
}
`;