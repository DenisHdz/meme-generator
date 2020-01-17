import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Main = styled.main`
  max-width: 80rem;
  margin: 3.175rem auto;
  text-align: center;
`;

const StyledInput = styled.input`
  font-size: 1rem;
  margin-right: 0.625rem;
  padding: 0.3125rem 0.375rem;
`;

const StyledButton = styled.button`
  color: #fff;
  background: #000;
  padding: 0.3125rem 1rem;
  font-size: 1rem;
  line-height: 1.75;
  border-radius: 0.3125rem;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
`;

const Meme = styled.div`
  background-size: 100%;
  ${({ randomImg }) => `
    background-image: url('${randomImg.url}');  
    width: ${randomImg.width}px;
    height: ${randomImg.height}px;`}
  max-width: 80rem;
  margin: 1.5625rem auto;
  text-align: center;
  position: relative;
`;

const textStyles = ` 
  position: absolute;
  left: 0;
  right: 0;
  margin: 1rem 0;
  font-size: 2em;
  font-family: impact;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 1px;
  text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000,
    -2px 2px 0 #000, 0px 2px 0 #000, 2px 0px 0 #000, 0px -2px 0 #000,
    -2px 0px 0 #000, 2px 2px 5px #000;`;

const TopText = styled.h2`
  top: 0;
  ${textStyles}
`;

const BottomText = styled.h2`
  bottom: 0;
  ${textStyles}
`;

const MemeGenerator = () => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [randomImg, setRandomImg] = useState({
    url: "http://i.imgflip.com/1bij.jpg",
    width: 568,
    height: 335
  });
  const [memeImgs, setMemeImgs] = useState([]);

  async function fetchData() {
    const res = await fetch("https://api.imgflip.com/get_memes");
    res.json().then(res => {
      const { memes } = res.data;
      setMemeImgs(memes);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    name === "topText" ? setTopText(value) : setBottomText(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const randomNum = Math.floor(Math.random() * memeImgs.length);
    const randomMemeUrl = memeImgs[randomNum].url;
    const randomMemeWidth = memeImgs[randomNum].width;
    const randomMemeHeight = memeImgs[randomNum].height;

    setRandomImg({
      url: randomMemeUrl,
      width: randomMemeWidth,
      height: randomMemeHeight
    });
  };

  return (
    <Main>
      <form onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          name="topText"
          placeholder="Top Text"
          value={topText}
          onChange={handleChange}
        />
        <StyledInput
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={handleChange}
        />
        <StyledButton>Random Image</StyledButton>
      </form>
      <Meme randomImg={randomImg}>
        <TopText>{topText}</TopText>
        <BottomText>{bottomText}</BottomText>
      </Meme>
    </Main>
  );
};

export default MemeGenerator;
