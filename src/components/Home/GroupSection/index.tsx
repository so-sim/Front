import { CardList } from '../CardList';
import * as Style from './styles';

export const GroupSection = () => {
  return (
    <Style.Wrapper>
      <Style.GroupSection>
        <Style.Title>참여 모임</Style.Title>
        <CardList />
      </Style.GroupSection>
    </Style.Wrapper>
  );
};
