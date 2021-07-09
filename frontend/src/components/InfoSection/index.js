import React from "react";
import {
    InfoContainer,
    InfoWrapper,
    InfoRow,
    Column1,
    TextWrapper,
    TopLine,
    Heading,
    SubTitle,
    BtnWrap
} from './infoStyle'
import {Button} from '../HeroSection/ButtonStyle'

function InfoSection() {
  return (
    <>
      <InfoContainer id={id}>
        <InfoWrapper>
          <InfoRow>
            <Column1>
              <TextWrapper>
                <TopLine>TopLine</TopLine>
                <Heading>Heading</Heading>
                <SubTitle>SubTitle</SubTitle>
                <BtnWrap>
                  <Button to="/">Home</Button>
                </BtnWrap>
              </TextWrapper>
            </Column1>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
}

export default InfoSection;
