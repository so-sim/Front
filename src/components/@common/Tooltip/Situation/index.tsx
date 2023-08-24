import { ARROW } from '@/assets/icons/Arrow';
import { CircleDropButton } from '@/components/DetailFine';
import * as Style from './styles';

const Situation_Tooltip1 = () => {
  return (
    <Style.Content>
      <Style.Subhead>총무라면?</Style.Subhead>
      <Style.Body>팀원이 벌금을 낸 경우</Style.Body>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CircleDropButton situation="미납" origin="미납" />
        {ARROW.FORWARD}
        <CircleDropButton situation="완납" origin="완납" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CircleDropButton situation="확인중" origin="확인중" />
          <Style.Asterisk2>*</Style.Asterisk2>
        </div>
        {ARROW.FORWARD}
        <CircleDropButton situation="완납" origin="완납" />
      </div>
      <Style.Body>팀원이 벌금을 안 낸 경우</Style.Body>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CircleDropButton situation="완납" origin="완납" />
        {ARROW.FORWARD}
        <CircleDropButton situation="미납" origin="미납" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CircleDropButton situation="확인중" origin="확인중" />
          <Style.Asterisk2>*</Style.Asterisk2>
        </div>
        {ARROW.FORWARD}
        <CircleDropButton situation="미납" origin="미납" />
      </div>
      <div style={{ display: 'flex', gap: '2px', margin: '12px 0' }}>
        <Style.Asterisk>*</Style.Asterisk>
        <Style.DescWrapper>
          승인대기란, 팀원이 벌금을 낸 후, 총무의 최종 승인을 기다리는 상태입니다. 승인대기에서 다른 상태값으로 변경하면, 다시 승인대기 상태로 되돌릴 수 없습니다.
        </Style.DescWrapper>
      </div>
    </Style.Content>
  );
};

const Situation_Tooltip2 = () => {
  return (
    <Style.Content>
      <Style.Subhead>팀원이라면?</Style.Subhead>
      <Style.Body>벌금을 냈다면 아래와 같이 변경해보세요!</Style.Body>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CircleDropButton situation="미납" origin="미납" />
        {ARROW.FORWARD}
        <CircleDropButton situation="확인중" origin="미납" />
      </div>
      <Style.Body>변경 시 총무에게 알림이 가며 총무의 최종 승인 이후,</Style.Body>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CircleDropButton situation="완납" origin="완납" />
        <Style.Body>로 변경됩니다.</Style.Body>
      </div>

      <div style={{ display: 'flex', gap: '2px', margin: '12px 0', alignItems: 'center' }}>
        <Style.Asterisk>*</Style.Asterisk>
        <Style.DescWrapper>총무 승인 전까지{<CircleDropButton situation="확인중" origin="확인중" />}버튼으로 노출됩니다.</Style.DescWrapper>
      </div>
    </Style.Content>
  );
};

export default [<Situation_Tooltip1 />, <Situation_Tooltip2 />];
