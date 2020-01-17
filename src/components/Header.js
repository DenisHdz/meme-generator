import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #b80000;
  padding: 0.5rem 1rem;
`;

const Image = styled.img`
  width: 3.75rem;
  height: auto;
  margin-right: 1rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
`;

const Header = () => (
  <StyledHeader>
    <Image
      src="http://www.pngall.com/wp-content/uploads/2016/05/Trollface.png"
      alt="Problem?"
    />
    <Title>Meme Generator</Title>
  </StyledHeader>
);

export default Header;
