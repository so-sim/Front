import { FC, useEffect, useState } from 'react';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import { useError } from '@/utils/validation';
import * as Style from './styles';
import { ModalHandlerProps } from '../../CreateGroupModal';
import { useGroupDetail, useUpdateGroup } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { GroupColor, NotificationInfo } from '@/types/group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { GA } from '@/constants/GA';
import { Tab } from '@/components/@common/Tab';
import GroupForm from './GroupForm';
import { useNotificationInfo, useUpdateNotificationInfo } from '@/queries/Group';
import NotificationForm from './NotifiactionForm';
import dayjs from 'dayjs';
import { isValidGroupForm, isValidNotificationForm } from './utils/validation';

const TAB_LIST = [
  { label: '사용자 설정', value: 'GROUP' },
  { label: '알림 설정', value: 'ALARM' },
];

export type GroupFormData = {
  title: string;
  nickname: string;
  type: string;
  coverColor: GroupColor;
};

export const AdminModal: FC<ModalHandlerProps> = ({ modalHandler }) => {
  const { groupId } = useParams();
  const [tapValue, setTapValue] = useState('GROUP');

  const [groupForm, setGroupForm] = useState<GroupFormData>({
    title: '',
    nickname: '',
    type: '',
    coverColor: '#f89a65',
  });

  const [notificationForm, setNotificationForm] = useState<NotificationInfo>({
    enableNotification: true,
    settingType: 'M',
    repeatCycle: 1,
    startDate: dayjs().format('YYYY.MM.DD'),
    sendTime: '19:00',
    monthSettingType: 'SIMPLE_DATE',
    sendDay: dayjs().date(),
    ordinalNumbers: [],
    daysOfWeek: [],
  });

  const [isError, setError] = useError({
    nickname: '',
    groupName: '',
  });

  const { mutate: updateGroupMutate, isLoading: groupInfoLoading } = useUpdateGroup({ setError, modalHandler });
  const { mutate: updateNotificationInfo, isLoading: notificationInfoLoading } = useUpdateNotificationInfo(Number(groupId));
  const { data: notificationInfo } = useNotificationInfo(Number(groupId));

  const { data: groupData } = useGroupDetail(Number(groupId));
  const { data: myNickname } = useGetMyNikname(Number(groupId));

  const handleSubmitForm = () => {
    if (tapValue === 'GROUP') return updateGroupMutate({ groupId: Number(groupId), ...groupForm });
    if (tapValue === 'ALARM') return updateNotificationInfo({ notificationInfo: notificationForm });
  };

  const isValidForm = () => {
    if (tapValue === 'GROUP') return isValidGroupForm(groupForm);
    if (tapValue === 'ALARM') return isValidNotificationForm(notificationForm);
  };

  const isLoading = tapValue === 'GROUP' ? groupInfoLoading : notificationInfoLoading;

  useEffect(() => {
    if (!groupData) return;
    if (!myNickname) return;

    const { title, coverColor, type, adminNickname } = groupData.content;
    setGroupForm({ title, coverColor, type, nickname: adminNickname });
  }, [groupData?.content.title]);

  useEffect(() => {
    if (notificationInfo?.content !== null) {
      setNotificationForm((prev) => ({ ...prev, ...notificationInfo?.content }));
    }
  }, [notificationInfo]);

  return (
    <Modal.Frame onClick={modalHandler} width="492px">
      <Modal.Header align="start" onClick={modalHandler} margin="16px">
        <Style.Title>모임 설정</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Style.Layout>
          <Tab.Container onChange={setTapValue}>
            <Style.Nav>
              {TAB_LIST.map((tab) => {
                return (
                  <Style.SubTitle //
                    key={tab.value}
                    isSelected={tab.value === tapValue}
                  >
                    <Tab.Element {...tab} />
                  </Style.SubTitle>
                );
              })}
            </Style.Nav>
          </Tab.Container>
          {/* 여기 컨텐츠가 바뀌어야 됨 */}
          {tapValue === 'GROUP' ? (
            <GroupForm //
              groupForm={groupForm}
              setGroupForm={setGroupForm}
              isError={isError}
              setError={setError}
            />
          ) : (
            <NotificationForm //
              notificationForm={notificationForm}
              setNotificationForm={setNotificationForm}
            />
          )}
        </Style.Layout>
      </Modal.Body>
      <Modal.Footer>
        <Style.ButtonFrame>
          <Button color="white" onClick={modalHandler}>
            취소
          </Button>
          <Button
            color={isValidForm() ? 'black' : 'disabled'}
            onClick={handleSubmitForm}
            id={GA.GROUP.MODIFY}
            loading={isLoading} //
          >
            저장
          </Button>
        </Style.ButtonFrame>
      </Modal.Footer>
    </Modal.Frame>
  );
};
