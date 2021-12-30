import React from "react";
import styled from "styled-components";

interface Props {
  images: string[];
}

const Images = ({ images }: Props) => {
  return (
    <Wrapper>
      {images.length !== 0 && <Title>Bilder</Title>}
      <ImagesWrapper>
        {images.map((a) => (
          <Image src={a} />
        ))}
      </ImagesWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Title = styled.h2`
  margin: 15px 0 10px;
`;
const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 80vh;
  overflow-y: scroll;
  border-radius: 12px;
`;
const Image = styled.img`
  margin: 5px 10px 5px 0;
  width: 100%;
  max-height: 420px;
  border-radius: 12px;
  border: 1px solid black;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  @media (min-width: 800px) {
    width: 48%;
  }
`;

export default Images;
