import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Button } from "../HeroSection/ButtonStyle";
import "./style.css";

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

function ContactSection({
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(false);

  const service_id = "service_yzxydev";
  const template_id = "template_icbmlrq";
  const user_id = "user_bvpcIKvVjLS2DSFcKKLRH";
  const contactDetails = {
    name: "USER",
    email: email,
    subject: subject,
    message: message,
  };
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send(service_id, template_id, contactDetails, user_id).then(
      (result) => {
        setResult(true);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

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
                <div className="contactForm">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <label>Email:</label>
                        </td>
                        <td>
                          <label>Subject:</label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            required
                            onChange={(e) => setSubject(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <textarea
                            rows="3"
                            cols="25"
                            name="message"
                            placeholder="message"
                            required
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <BtnWrap>
                  <Button
                    smooth={true}
                    duration={500}
                    offset={-80}
                    primary={primary ? 1 : 0}
                    dark={dark ? 1 : 0}
                    darkText={darkText ? 1 : 0}
                    to=""
                    onClick={sendEmail}
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

export default ContactSection;
