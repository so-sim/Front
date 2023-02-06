import AddCard from '../Card/AddCard';
import { GroupCard } from '../Card/GroupCard';
import * as Style from './style';

export interface GroupInfo {
  title: string;
  color: string;
  people: number;
}

export const CardList = () => {
  const groupList: GroupInfo[] = [
    { title: '전국 대한 산악회1', color: '#f86565', people: 1 },
    { title: '전국 대한 산악회2', color: '#f89a65', people: 1 },
    { title: '전국 대한 산악회3', color: '#f8e065', people: 1 },
    { title: '전국 대한 산악회4', color: '#658ef8', people: 1 },
    { title: '전국 대한 산악회5', color: '#9465f8', people: 1 },
    { title: '전국 대한 산악회6', color: '#f86565', people: 1 },
    { title: '전국 대한 산악회7', color: '#658ef8', people: 1 },
  ];

  return (
    <Style.CardList>
      <AddCard />
      {groupList.map((group) => {
        return <GroupCard {...group} key={group.title} />;
      })}
    </Style.CardList>
  );
};
