import React from "react";
import { Button } from "react-scroll";

import {
  InfoContainer,
  InfoWrapper,
  InfoRow,
  Column1,
  TextWrapper,
  TopLine,
  Heading,
  SubTitle,
  BtnWrap,
  ImgWrap,
  Img,
  Column2,
} from "./infoStyle";

function InfoSection() {
  return (
    <>
      <InfoContainer>
        <InfoWrapper>
          <InfoRow>
            <Column1>
              <TextWrapper>
                <TopLine>TopLine</TopLine>
                <Heading>Heading</Heading>
                <SubTitle>SubTitle</SubTitle>
                <BtnWrap>
                  <Button to="/"/>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
}

export default InfoSection;
