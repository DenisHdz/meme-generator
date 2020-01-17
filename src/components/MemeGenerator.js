import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Main = styled.main``;

const StyledInput = styled.input``;

const StyledButton = styled.button``;

const Meme = styled.div``;

const TopText = styled.h2`
  top: 0;
`;

const BottomText = styled.h2`
  bottom: 0;
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
