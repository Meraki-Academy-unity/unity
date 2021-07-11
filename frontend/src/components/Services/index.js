import React from "react";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesStyle";

import icon1 from "../../Images/group2.png";
import icon2 from "../../Images/group5.png";
import icon3 from "../../Images/group6.png";

const Services = () => {
  return (
    <>
      <ServicesContainer id="services2">
        <ServicesH1>OUR SERVICES</ServicesH1>
        <ServicesWrapper>
          <ServicesCard>
            <ServicesIcon src={icon1} />
            <ServicesH2>Activities</ServicesH2>
            <ServicesP>
              Start Looking For Local Activities And Join It.
            </ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={icon2} />
            <ServicesH2>Travel PLans</ServicesH2>
            <ServicesP>Start Looking for World Wide Travel Posts.</ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={icon3} />
            <ServicesH2>Matches</ServicesH2>
            <ServicesP>Look Who Matches Your Preferences.</ServicesP>
          </ServicesCard>
        </ServicesWrapper>
      </ServicesContainer>
    </>
  );
};

export default Services;
