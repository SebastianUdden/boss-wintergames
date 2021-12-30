import React from "react";
import styled from "styled-components";

export interface TeamProps {
  title: string;
  members: string[];
}

interface Props {
  teams: TeamProps[];
}

const Teams = ({ teams }: Props) => (
  <Wrapper>
    {teams.map((t) => (
      <Team>
        <TeamTitle>{t.title}</TeamTitle>
        <Participants>
          {t.members.map((p) => (
            <Participant>{p}</Participant>
          ))}
        </Participants>
      </Team>
    ))}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Team = styled.div`
  margin: 5px 5px 0 0;
  border-radius: 6px;
  background-color: #333;
  padding: 20px;
  width: 49%;
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  @media (max-width: 800px) {
    width: 100%;
  }
`;
const TeamTitle = styled.h3`
  margin: 0 0 5px 0;
  color: #ffff00;
`;
const Participants = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
const Participant = styled.li``;

export default Teams;
