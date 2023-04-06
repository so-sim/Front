import { AdminModal } from '@/common/Modal/GroupSettingModal/AdminModal';
import { UserModal } from '@/common/Modal/GroupSettingModal/UserModal';
import { useGroupDetail } from '@/queries/Group';
import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { SYSTEM } from '../../../../assets/icons/System';
import { USER } from '../../../../assets/icons/User';
import * as Style from './styles';

const GROUP_TAPS = [
  { title: '홈', svg: SYSTEM.HOME, disabled: true, link: 'home' },
  { title: '공지사항', svg: SYSTEM.NOTICE, disabled: true, link: 'notice' },
  { title: '벌금 장부', svg: SYSTEM.ARTICLE, disabled: false, link: 'book' },
];
const ETC = [
  { title: '멤버 관리', svg: USER.GROUP_LG, link: 'member' },
  { title: '설정', svg: SYSTEM.SETTING_LG },
];

const GroupSideBar = () => {
  const [showGroupSettingModal, setShowGroupSettingModal] = useState(false);
  const param = useParams();
  const { groupId } = param;

  const { data: groupData } = useGroupDetail({ groupId: Number(groupId) });

  const isSelected = (link: string) => {
    return param['*']?.split('/').includes(link) === true;
  };

  const handleGroupSettingModal = () => {
    setShowGroupSettingModal((prev) => !prev);
  };

  return (
    <>
      <Style.Layout>
        <Style.Header>{groupData?.content.title}</Style.Header>
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
              <Style.Tap key={etc.title} onClick={handleGroupSettingModal}>
                <div>{etc.svg}</div>
                <span>{etc.title}</span>
              </Style.Tap>
            ),
          )}
        </Style.TapContainer>
      </Style.Layout>
      {groupData?.content.isAdmin && showGroupSettingModal && <AdminModal modalHandler={handleGroupSettingModal} />}
      {!groupData?.content.isAdmin && showGroupSettingModal && <UserModal modalHandler={handleGroupSettingModal} />}
    </>
  );
};

export default GroupSideBar;
