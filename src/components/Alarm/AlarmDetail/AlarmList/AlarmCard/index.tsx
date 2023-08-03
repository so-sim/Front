import * as Style from './styles';

const TextByAlarmType = {};
// 해당 enum에 따라 Text를 정의해준다.

const AlarmCard = () => {
  return (
    <Style.AlarmCardContainer>
      <Style.Header>
        <Style.Circle />
        <Style.AlarmTypeText>미납안내</Style.AlarmTypeText>
        <Style.DateTitle>12월30일</Style.DateTitle>
      </Style.Header>
      <Style.Title>오늘은 벌금 납부일입니다.</Style.Title>
      <Style.GroupText>정민모임</Style.GroupText>
      <Style.Descripttion>설명란</Style.Descripttion>
    </Style.AlarmCardContainer>
  );
};

export default AlarmCard;
