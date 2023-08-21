import { ARROW } from '@/assets/icons/Arrow';
import { CircleDropButton } from '@/components/DetailFine';
import React from 'react';
import * as Style from './styles';

const Situation = () => {
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
          <span>*</span>
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
          <span>*</span>
        </div>
        {ARROW.FORWARD}
        <CircleDropButton situation="미납" origin="미납" />
      </div>
      <div>
        <div>*</div>
        <div>승인대기란, 팀원이 벌금을 낸 후, 총무의 최종 승인을 기다리는 상태입니다. 승인대기에서 다른 상태값으로 변경하면, 다시 승인대기 상태로 되돌릴 수 없습니다.</div>
      </div>
    </Style.Content>
  );
};

export default [<Situation />];
