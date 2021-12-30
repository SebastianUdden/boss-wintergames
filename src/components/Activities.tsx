import React from "react";
import styled from "styled-components";

export interface ActivityProps {
  title: string;
  description: string;
}

interface Props {
  activities: ActivityProps[];
}

const Activities = ({ activities }: Props) => {
  return (
    <Wrapper>
      <Title>Aktiviteter</Title>
      <ActivitiesWrapper>
        {activities.map((a: ActivityProps) => (
          <Activity>
            <ActivityTitle>{a.title}</ActivityTitle>
            {a.description && <Description>{a.description}</Description>}
          </Activity>
        ))}
      </ActivitiesWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Title = styled.h2`
  margin: 15px 0 10px;
`;
const ActivitiesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Activity = styled.div`
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
const ActivityTitle = styled.h3`
  margin: 0 0 5px 0;
  color: #ff00ff;
`;
const Description = styled.p`
  margin: 0;
`;

export default Activities;
