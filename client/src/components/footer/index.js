import React from "react";
import {
  FooterContainer,
  FooterWrap,
  FooterLinkContainer,
  FooterLinkWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
} from "./FooterStyle";

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterWrap>
          <FooterLinkContainer>
            <FooterLinkWrapper>
              <FooterLinkItems>
                <FooterLinkTitle> About us</FooterLinkTitle>
                <FooterLink to="/">Testimonials</FooterLink>
                <FooterLink to="/">Careers</FooterLink>
                <FooterLink to="/">How it works</FooterLink>
                <FooterLink to="/">Inventors</FooterLink>
                <FooterLink to="/">Terms of service</FooterLink>
              </FooterLinkItems>
              <FooterLinkItems>
                <FooterLinkTitle> Contact Us</FooterLinkTitle>
                <FooterLink to="/">Contact</FooterLink>
                <FooterLink to="/">Support</FooterLink>
                <FooterLink to="/">Destination</FooterLink>
                <FooterLink to="/">Sponsorships</FooterLink>
              </FooterLinkItems>
            </FooterLinkWrapper>
            <FooterLinkWrapper>
              <FooterLinkItems>
                <FooterLinkTitle> Videos</FooterLinkTitle>
                <FooterLink to="/">Submit video</FooterLink>
                <FooterLink to="/">Ambassadors</FooterLink>
                <FooterLink to="/">Agency</FooterLink>
                <FooterLink to="/">Influncer</FooterLink>
              </FooterLinkItems>
              <FooterLinkItems>
                <FooterLinkTitle> Social Media</FooterLinkTitle>
                <FooterLink to="/">Youtube</FooterLink>
                <FooterLink to="/">Instagram</FooterLink>
                <FooterLink to="/">Twitter</FooterLink>
                <FooterLink to="/">Facebook</FooterLink>
              </FooterLinkItems>
            </FooterLinkWrapper>
          </FooterLinkContainer>
        </FooterWrap>
      </FooterContainer>
    </>
  );
};

export default Footer;
