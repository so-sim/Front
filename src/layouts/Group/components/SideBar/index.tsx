import { AdminModal } from '@/components/@common/Modal/GroupSettingModal/AdminModal';
import { UserModal } from '@/components/@common/Modal/GroupSettingModal/UserModal';
import { GA } from '@/constants/GA';
import { useGroupDetail } from '@/queries/Group';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import * as Style from './styles';
import { isMobile } from 'react-device-detect';

const GROUP_TAPS = [
  { title: '홈', svg: SYSTEM.HOME, disabled: true, link: 'home' },
  { title: '공지사항', svg: SYSTEM.NOTICE, disabled: true, link: 'notice' },
  { title: '벌금 장부', svg: SYSTEM.ARTICLE, disabled: false, link: 'book' },
];

const ETC = [
  { title: '멤버 관리', svg: USER.GROUP_LG, link: 'member', id: GA.MEMBER_SETTING },
  { title: '설정', svg: SYSTEM.SETTING_LG, id: GA.GROUP.SETTING },
];

const GroupSideBar = () => {
  const param = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { groupId } = param;

  const { data: group } = useGroupDetail(Number(groupId));
  const isAdmin = group?.content.isAdmin;

  const [showGroupSettingModal, setShowGroupSettingModal] = useState(false);
  const { data: groupData, isError } = useGroupDetail(Number(groupId));

  const isSelected = (link: string) => {
    if (isMobile) {
      return location.pathname.includes(link) === true;
    }
    return param['*']?.split('/').includes(link) === true;
  };

  const handleGroupSettingModal = () => {
    setShowGroupSettingModal((prev) => !prev);
  };

  const moveToSettingPage = () => {
    if (isMobile) {
      navigate(`/m-group/${groupId}/group-setting`);
    }
  };

  useEffect(() => {
    if (groupData && !groupData.content.isInto) {
      navigate('/');
    }
    if (!groupData && isError) {
      navigate('/');
    }
  }, [groupId, isError, groupData?.content.isInto]);

  const devicePath = isMobile ? 'm-group' : 'group';

  return (
    <>
      <Style.Layout>
        <Style.Header>{groupData?.content.title}</Style.Header>
        <Style.TapContainer>
          <Style.Category>벌금 관리</Style.Category>
          {GROUP_TAPS.map((tap) => (
            <NavLink to={`/${devicePath}/${groupId}/${tap.link}`} key={tap.title}>
              <Style.Selected isSelected={isSelected(tap.link)} />
              <Style.Tap disabled={tap.disabled}>
                <div style={{ height: '24px' }}>{tap.svg}</div>
                <span>{tap.title}</span>
              </Style.Tap>
            </NavLink>
          ))}
        </Style.TapContainer>
        <Style.TapContainer>
          <Style.Category>기타</Style.Category>
          {ETC.map((etc) =>
            etc.link ? (
              <NavLink to={`/${devicePath}/${groupId}/${etc.link}`} key={etc.title} id={etc.id}>
                <Style.Selected isSelected={isSelected(etc.link)} />
                <Style.Tap key={etc.title}>
                  <div style={{ height: '24px' }}>{etc.svg}</div>
                  <span>{etc.title}</span>
                </Style.Tap>
              </NavLink>
            ) : (
              <Style.GroupSettingContainer onClick={() => (isMobile ? moveToSettingPage() : handleGroupSettingModal())}>
                <Style.Tap key={etc.title} id={etc.id}>
                  <div style={{ height: '21px' }}>{etc.svg}</div>
                  <span>{etc.title}</span>
                </Style.Tap>
              </Style.GroupSettingContainer>
            ),
          )}
        </Style.TapContainer>
      </Style.Layout>
      {isAdmin && !isMobile && showGroupSettingModal && <AdminModal modalHandler={handleGroupSettingModal} />}
      {!isAdmin && !isMobile && showGroupSettingModal && <UserModal modalHandler={handleGroupSettingModal} />}
    </>
  );
};

export default GroupSideBar;
