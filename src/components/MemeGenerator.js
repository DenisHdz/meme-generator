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
    url: "http://i.imgflip.com/1bij.jpg"
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

  return (
    <Main>
      <form>
        <StyledInput
          type="text"
          name="topText"
          placeholder="Top Text"
          value={topText}
        />
        <StyledInput
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={bottomText}
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
