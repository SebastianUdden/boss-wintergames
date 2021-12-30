import styled from "styled-components";

interface Props {
  onTabChange: (tab: number) => void;
}

const Menu = ({ onTabChange }: Props) => {
  return (
    <Wrapper>
      <Title onClick={() => onTabChange(0)}>BOSS WinterGames</Title>
      <Selection>Menu</Selection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #000;
  color: #fff;
  font-size: 18px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  margin: 0;
`;
const Selection = styled.div``;

export default Menu;
