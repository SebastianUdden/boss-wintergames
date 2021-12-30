import React from "react";
import styled from "styled-components";
import { wintergames } from "../constants/previousWinterGames";
import Wintergame from "./WinterGame";

const WinterGames = () => {
  return (
    <Wrapper>
      {wintergames.map((wg) => (
        <Wintergame {...wg} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export default WinterGames;
