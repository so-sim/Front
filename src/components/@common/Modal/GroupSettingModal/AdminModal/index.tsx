import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { Input, Label } from '@/components/@common';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import { checkCountChar, useError } from '@/utils/validation';
import { GroupColorList } from '../../../GroupColorList';
import { DropBox } from '@/components/@common';
import * as Style from './styles';
import { COLORS, DROPDOWN_LIST } from '@/constants/Group';
import { ModalHandlerProps } from '../../CreateGroupModal';
import { useDeleteGroup, useGroupDetail, useUpdateGroup, useWithdrawalGroup } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { GroupColor } from '@/types/group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { GA } from '@/constants/GA';
import useConfirmModal from '@/hooks/useConfirmModal';
import { Tab } from '@/components/@common/Tab';
import { Toggle } from '@/components/@common/Toggle';
import GroupForm from './GroupForm';

type TabValue = 'ALARM' | 'GROUP';

const TAB_LIST = [
  { label: '사용자 설정', value: 'GROUP' },
  { label: '알람 설정', value: 'ALARM' },
];

const PERIOD_TYPE_LIST = [
  { label: '매달', value: 'M' },
  { label: '매주', value: 'W' },
  { label: '매일', value: 'D' },
];

export type GroupFormData = {
  title: string;
  nickname: string;
  type: string;
  coverColor: GroupColor;
};

export const AdminModal: FC<ModalHandlerProps> = ({ modalHandler }) => {
  const [tapValue, setTapValue] = useState('ALARM');
  const [periodType, setPeriodType] = useState('M');

  const [groupForm, setGroupForm] = useState<GroupFormData>({
    title: '',
    nickname: '',
    type: '',
    coverColor: '#f89a65',
  });

  const [onAlarm, setOnAlarm] = useState(false);

  const [isError, setError] = useError({
    nickname: '',
    groupName: '',
  });

  const { groupId } = useParams();

  const { mutate: updateGroupMutate, isLoading } = useUpdateGroup({ setError, modalHandler });

  const { data: groupData } = useGroupDetail(Number(groupId));
  const { data: myNickname } = useGetMyNikname(Number(groupId));

  const handleSubmitForm = () => {
    if (tapValue === 'GROUP') {
      return updateGroupInfo();
    }
    if (tapValue === 'ALARM') {
      console.log('hi');
    }
  };

  const updateGroupInfo = () => {
    const id = Number(groupId);
    updateGroupMutate({ groupId: id, ...groupForm });
  };

  const isValidForm = () => {
    const { title, nickname, type, coverColor } = groupForm;
    if (checkCountChar(title)) return false;
    if (checkCountChar(nickname)) return false;
    if (type === '') return false;
    if (!COLORS.includes(coverColor)) return false;
    return true;
  };

  useEffect(() => {
    if (!groupData) return;
    if (!myNickname) return;

    const { title, coverColor, type, adminNickname } = groupData.content;
    setGroupForm({ title, coverColor, type, nickname: adminNickname });
  }, [groupData?.content.title]);

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
                  <Style.SubTitle key={tab.value} isSelected={tab.value === tapValue}>
                    <Tab.Element {...tab} />
                  </Style.SubTitle>
                );
              })}
            </Style.Nav>
          </Tab.Container>
          {/* 여기 컨텐츠가 바뀌어야 됨 */}
          {tapValue === 'GROUP' ? (
            <GroupForm groupForm={groupForm} setGroupForm={setGroupForm} isError={isError} setError={setError} />
          ) : (
            <Style.Container>
              <div>
                <Style.TabTitle>벌금 납부 알림</Style.TabTitle>
                <Toggle onToggle={onAlarm} setOnToggle={setOnAlarm} />
              </div>
              <Style.StartDateOfNotificationBox>
                <div>이번 달부터</div>
                <div>알림을 설정해주세요.</div>
              </Style.StartDateOfNotificationBox>
              <Style.TabContainer>
                <Style.TabTitle>납부일 설정</Style.TabTitle>
                <Style.TabButtonBox>
                  {PERIOD_TYPE_LIST.map((type) => {
                    return (
                      <Style.PeriodTypeButton //
                        isSelected={type.value === periodType}
                        onClick={() => setPeriodType(type.value)}
                      >
                        {type.label}
                      </Style.PeriodTypeButton>
                    );
                  })}
                </Style.TabButtonBox>
              </Style.TabContainer>
            </Style.Container>
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
