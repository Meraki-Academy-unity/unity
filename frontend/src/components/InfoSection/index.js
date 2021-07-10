import React from "react";
import { Button } from "../HeroSection/ButtonStyle";

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

function InfoSection({
  id,
  lightBg,
  LightText,
  lightTextDesc,
  topLine,
  headLine,
  description,
  buttonLabel,
  imgStart,
  img,
  alt,
  dark,
  primary,
  darkText,
}) {
  console.log(img.default);
  return (
    <>
      <InfoContainer LightBg={lightBg} id={id}>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading LightText={LightText}>{headLine}</Heading>
                <SubTitle darkText={darkText}>{description}</SubTitle>
                <BtnWrap>
                  <Button
                    smooth={true}
                    duration={500}
                    offset={-80}
                    primary={primary ? 1 : 0}
                    dark={dark ? 1 : 0}
                    darkText={darkText ? 1 : 0}
                    to="services2"
                  >
                    {buttonLabel}
                  </Button>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img.default} alt={alt} />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
}

export default InfoSection;
