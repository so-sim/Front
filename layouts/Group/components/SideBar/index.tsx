import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { SYSTEM } from '../../../../assets/icons/System';
import { USER } from '../../../../assets/icons/User';
import Modal from '../../../../common/Modal';
import * as Style from './styles';

const GROUP_TAPS = [
  { title: '홈', svg: SYSTEM.HOME, disabled: true, link: 'home' },
  { title: '공지사항', svg: SYSTEM.NOTICE, disabled: true, link: 'notice' },
  { title: '벌금 장부', svg: SYSTEM.ARTICLE, disabled: false, link: 'book' },
];
const ETC = [
  { title: '맴버 관리', svg: USER.GROUP_LG, link: 'member' },
  { title: '설정', svg: SYSTEM.SETTING_LG },
];

const GroupSideBar = () => {
  const param = useParams();
  const { groupId } = param;

  const isSelected = (link: string) => {
    return param['*']?.split('/').includes(link) === true;
  };

  return (
    <>
      <Style.Layout>
        <Style.Header>안녕하세요안녕하세요안녕하세요</Style.Header>
        <Style.TapContainer>
          <span>모임관리</span>
          {GROUP_TAPS.map((tap) => (
            <NavLink to={`/group/${groupId}/${tap.link}`} key={tap.title}>
              <Style.Selected isSelected={isSelected(tap.link)} />
              <Style.Tap disabled={tap.disabled}>
                <div>{tap.svg}</div>
                <span>{tap.title}</span>
              </Style.Tap>
            </NavLink>
          ))}
        </Style.TapContainer>
        <Style.TapContainer>
          <span>기타</span>
          {ETC.map((etc) =>
            etc.link ? (
              <NavLink to={`/group/${groupId}/${etc.link}`} key={etc.title}>
                <Style.Selected isSelected={isSelected(etc.link)} />
                <Style.Tap key={etc.title}>
                  <div>{etc.svg}</div>
                  <span>{etc.title}</span>
                </Style.Tap>
              </NavLink>
            ) : (
              <Style.Tap key={etc.title}>
                <div>{etc.svg}</div>
                <span>{etc.title}</span>
              </Style.Tap>
            ),
          )}
        </Style.TapContainer>
      </Style.Layout>
    </>
  );
};

export default GroupSideBar;
