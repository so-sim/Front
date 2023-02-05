import AddCard from '../Card/AddCard';
import { GroupCard } from '../Card/GroupCard';
import * as Style from './style';

export interface Group {
  title: string;
  color: string;
  people: number;
}

export const CardList = () => {
  /**
   * 논의 필요
   * 1) color를 16진법으로 받아올지, => 변동 가능성이 있기 때문에
   * 2) blue, red와 같이 상징하는 색으로 받아올지 => 5가지가 아니라 많아질 수도 있음
   * 3) 바뀔 위험이 있잖아
   * => 그냥 색상 코드를 보내는게 좋을듯
   */
  const groupList: Group[] = [
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
