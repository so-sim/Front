import { MARK } from '@/assets/icons/Mark';
import { SYSTEM } from '@/assets/icons/System';
import { Situation } from '@/types/event';
import React from 'react';
import * as Style from './styles';

const SITUATION_STATUS_ICON = {
  미납: SYSTEM.MOBILENON,
  확인중: SYSTEM.MOBILECON,
  완납: SYSTEM.MOBILEFULL,
};

const SITUATION_STATUS_TEXT = {
  미납: '납부 전',
  확인중: '승인 대기',
  완납: '납부 완료',
};

const MobileCalendarTooltip = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Style.Row>
        <span>{MARK.RED}</span>
        <span>
          <div>벌금을 내지 않은 팀원이</div>
          <Style.DescriptionWrapper>
            <SituationButton situation="미납" />
            <span> 있는 경우</span>
          </Style.DescriptionWrapper>
        </span>
      </Style.Row>
      <Style.Row>
        <div>{MARK.BLUE}</div>
        <span>
          <div>모든 팀원이 벌금을 낸</div>
          <Style.DescriptionWrapper>
            <SituationButton situation="완납" />
            <span>경우</span>
          </Style.DescriptionWrapper>
        </span>
      </Style.Row>
      <Style.Row>
        <div>{MARK.YELLOW}</div>
        <span>
          <div>벌금을 낸 후, 총무의 승인을 기다리는</div>
          <Style.DescriptionWrapper>
            <span>팀원이 있는 </span>
            <SituationButton situation="확인중" />
            <span> 경우</span>
          </Style.DescriptionWrapper>
        </span>
      </Style.Row>
    </div>
  );
};

export default [<MobileCalendarTooltip />];

type Props = {
  situation: Situation;
};
export const SituationButton = ({ situation }: Props) => {
  return (
    <Style.SituationBox situationType={situation}>
      <Style.IconWrapper>{SITUATION_STATUS_ICON[situation]}</Style.IconWrapper>
      {SITUATION_STATUS_TEXT[situation]}
    </Style.SituationBox>
  );
};
