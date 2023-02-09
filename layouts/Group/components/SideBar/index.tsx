import React from 'react';
import { SYSTEM } from '../../../../assets/icons/System';
import { USER } from '../../../../assets/icons/User';
import * as Style from './styles';

const TAPS = [
  { title: '홈', svg: SYSTEM.HOME, disabled: true },
  { title: '공지사항', svg: SYSTEM.NOTICE, disabled: true },
  { title: '벌금 장부', svg: SYSTEM.ARTICLE, disabled: false },
];
const ETC = [
  { title: '맴버 관리', svg: USER.GROUP_LG },
  { title: '설정', svg: SYSTEM.SETTING_LG },
];

const GroupSideBar = () => {
  return (
    <>
      <Style.Layout>
        <Style.Header>소심한 총무 모임명 적는 곳</Style.Header>
        <Style.TapContainer>
          <span>모임관리</span>
          {TAPS.map((tap) => (
            <Style.Tap disabled={tap.disabled}>
              <div>{tap.svg}</div>
              <span>{tap.title}</span>
            </Style.Tap>
          ))}
        </Style.TapContainer>
        <Style.TapContainer>
          <span>기타</span>
          {ETC.map((etc) => (
            <Style.Tap>
              <div>{etc.svg}</div>
              <span>{etc.title}</span>
            </Style.Tap>
          ))}
        </Style.TapContainer>
      </Style.Layout>
    </>
  );
};

export default GroupSideBar;
