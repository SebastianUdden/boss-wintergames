import styled from "styled-components";
import Activities, { ActivityProps } from "./Activities";
import Images from "./Images";
import Teams, { TeamProps } from "./Teams";

interface Props {
  title: string;
  occurred: string;
  coordinators: string[];
  participants: string[];
  teams: TeamProps[];
  activities: ActivityProps[];
  images: string[];
}

const WinterGame = ({
  title,
  occurred,
  coordinators,
  teams,
  activities,
  images,
}: Props) => {
  const t = title || "BOSS WinterGames";
  return (
    <Wrapper>
      <Title>{`${t} ${occurred}`}</Title>
      <Coordinators>by {coordinators.join(", ")}</Coordinators>
      <Teams teams={teams} />
      <Activities activities={activities} />
      <Images images={images} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #222;
  color: #fff;
  border-radius: 6px;
  padding: 30px 30px 50px;
  margin: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const Title = styled.h2`
  margin: 10px 0 5px;
`;
const Coordinators = styled.p`
  margin: 0;
  opacity: 0.5;
`;

export default WinterGame;
