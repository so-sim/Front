import DropBox from '@/components/@common/DropBox';
import { CalendarDropBox } from '@/components/@common/DropBox/CalendarDropBox';
import Label from '@/components/@common/Label';
import { GA } from '@/constants/GA';
import { Ground, SelectedEventInfo } from '@/types/event';
import { useParticipantList } from '@/queries/Group';
import { Situation } from '@/types/event';
import { convertToPriceFormat } from '@/utils/convertFormat';
import { useParams } from 'react-router-dom';
import * as Style from '../styles';
import CirCleCheckBox from './CircleCheckBox';
import useSituationList, { SituationText } from '@/hooks/useSituationList';
import { FormFieldActions } from '@/hooks/Group/useFinebook';

const GA_SITUATION = { 미납: GA.NON.LIST_MODAL, 완납: GA.FULL.LIST_MODAL, 확인중: '' };

const GroundArr: Ground[] = ['지각', '결석', '과제 안 함', '기타'];
type Props = {
  action: () => FormFieldActions;
  selectData: SelectedEventInfo;
};

const FormFileds = ({ selectData, action }: Props) => {
  const { groupId } = useParams();
  const { data: participants } = useParticipantList(Number(groupId));

  const { dropdownList, convertSituationToText, convertTextToSituation } = useSituationList(selectData.situation);

  const filteredSituationList = dropdownList
    .filter((situation) => convertTextToSituation(situation) !== selectData.situation)
    .map((title) => ({ title, id: GA_SITUATION[title as Situation] ?? '' }));

  const admin = { title: participants?.content.adminNickname as string };
  const participantList = participants?.content.nicknameList.map((nickname) => ({ title: nickname })) || [];
  const memberList = [admin, ...participantList];

  const {
    onChaneSituation, //
    onChangeAmount,
    onChangeDate,
    onChangeGround,
    onChangeMemo,
    onChangeNickName,
  } = action();

  return (
    <>
      <Style.Row>
        <Label title="팀원" width="32px" margin="0px">
          <DropBox boxWidth="146px" width={304} setType={onChangeNickName} type={selectData.nickname} dropDownList={memberList} direction="right" />
        </Label>
        <Label title="납부여부" width="56px" margin="0px">
          <DropBox color="white" boxWidth="110px" width={112} setType={onChaneSituation} type={convertSituationToText(selectData.situation)} dropDownList={filteredSituationList} />
        </Label>
      </Style.Row>
      <Style.Row>
        <Label title="금액" width="32px" margin="0px">
          <Style.Input type="string" value={convertToPriceFormat(selectData.amount)} onChange={onChangeAmount} style={{ height: '32px' }} />
        </Label>
        <Label title="날짜" width="32px" margin="0px">
          <CalendarDropBox type={selectData.date} setType={onChangeDate} color="white" />
        </Label>
      </Style.Row>
      <Style.Row>
        <Label title="사유" width="32px" margin="0px">
          <Style.ContainerForLabel>
            {GroundArr.map((item: Ground) => (
              <CirCleCheckBox
                key={item}
                id={item}
                isChecked={selectData.ground === item}
                onChange={() => {
                  onChangeGround(item);
                }}
              />
            ))}
          </Style.ContainerForLabel>
        </Label>
      </Style.Row>
      <Label title="메모" width="32px" margin="0px">
        <Style.TextArea maxLength={65} onChange={onChangeMemo} value={selectData.memo} placeholder="(선택) 내용을 입력해주세요." />
        <Style.Length>{selectData.memo.length}/65</Style.Length>
      </Label>
    </>
  );
};

export default FormFileds;
