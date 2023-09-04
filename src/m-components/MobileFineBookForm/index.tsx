import { ARROW } from '@/assets/icons/Arrow';
import { Ground, SelectedEventInfo, Situation } from '@/types/event';
import { useLocation } from 'react-router-dom';
import CirCleCheckBox from '@/components/@common/Modal/FineBookModal/FormFileds/CircleCheckBox';

import * as Style from './styles';
import { FormFieldActions } from '@/hooks/Group/useFinebook';
import { SituationText, SITUATION_LIST } from '@/hooks/useSituationList';
import { convertToPriceFormat, covertDateForView } from '@/utils/convertFormat';
import { useState } from 'react';
import MemberBottomSheet from '../BottomSheet/MemberBottomSheet';
import MobileMiniCalendar from '../MobileMiniCalendar';
import useLockScroll from '@/hooks/useLockScroll';

type Props = {
  selectData: SelectedEventInfo;
  action: () => FormFieldActions;
  convertSituationToText: (situation: Situation) => SituationText;
};

const GroundArr: Ground[] = ['지각', '결석', '과제 안 함', '기타'];

const MobileFineBookForm = ({ selectData, action, convertSituationToText }: Props) => {
  const location = useLocation();
  const isCreate = location.pathname.includes('create');

  const situationList = isCreate
    ? SITUATION_LIST.filter((value) => value !== '승인대기')
    : selectData.situation === '확인중'
    ? SITUATION_LIST
    : SITUATION_LIST.filter((value) => value !== '승인대기');

  const MEMO_MAX_LENGTH = 65;

  const [openMemberList, setOpenMemberList] = useState(false);
  useLockScroll(openMemberList, 'openMemberList');

  const [openDateCalendar, setOpenDateCalendar] = useState(false);

  const handleOpenMemberList = () => {
    setOpenMemberList((prev) => !prev);
  };

  const handleOpenDateCalendar = () => {
    setOpenDateCalendar((prev) => !prev);
  };

  const {
    onChangeGround, //
    onChangeAmount,
    onChaneSituation,
    onChangeDate,
    onChangeMemo,
    onChangeNickName,
  } = action();

  const isActive = (situationText: SituationText) => {
    return convertSituationToText(selectData.situation) === situationText;
  };

  return (
    <>
      <Style.Container>
        <Style.Row>
          <Style.Label onClick={handleOpenMemberList}>
            <span>팀원</span>
            <Style.Dropbox active={Boolean(selectData.nickname)}>
              <span>{selectData.nickname || '선택해주세요.'}</span>
              {ARROW.DOWN_LG_NON_FOCUS}
            </Style.Dropbox>
          </Style.Label>
        </Style.Row>
        <Style.Row>
          <Style.Label>
            <span>금액</span>
            <Style.Input
              type="tel"
              placeholder="0" //
              value={convertToPriceFormat(selectData.amount)}
              onChange={onChangeAmount}
            />
          </Style.Label>
          <Style.Label onClick={handleOpenDateCalendar}>
            <span>날짜</span>
            <Style.Dropbox active={Boolean(selectData.date)}>
              <span>{covertDateForView(selectData.date)}</span>
              {ARROW.DOWN_LG_NON_FOCUS}
            </Style.Dropbox>
          </Style.Label>
        </Style.Row>
        <Style.Row>
          <Style.Label>
            <span>납부여부</span>
            <Style.Row>
              {situationList.map((situation: SituationText) => (
                <Style.SituationButton //
                  key={situation}
                  active={isActive(situation)}
                  onClick={() => onChaneSituation(situation)}
                >
                  {situation}
                </Style.SituationButton>
              ))}
            </Style.Row>
          </Style.Label>
        </Style.Row>
        <Style.Row>
          <Style.Label>
            <span>사유</span>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {GroundArr.map((ground: Ground) => (
                <CirCleCheckBox
                  key={ground}
                  id={ground}
                  isChecked={selectData.ground === ground} //
                  onChange={() => onChangeGround(ground)}
                />
              ))}
            </div>
          </Style.Label>
        </Style.Row>
        <Style.Row>
          <Style.Label>
            <span>메모</span>
            <Style.TextareaWrapper>
              <Style.Textarea //
                placeholder="(선택) 내용을 입력해주세요."
                value={selectData.memo}
                onChange={onChangeMemo}
              />
              <div>
                {selectData.memo.length}/{MEMO_MAX_LENGTH}
              </div>
            </Style.TextareaWrapper>
          </Style.Label>
        </Style.Row>
      </Style.Container>
      {openMemberList && <MemberBottomSheet onClose={handleOpenMemberList} onChange={onChangeNickName} />}
      {openDateCalendar && (
        <MobileMiniCalendar //
          date={selectData.date}
          onChangeDate={onChangeDate}
          onClose={handleOpenDateCalendar}
        />
      )}
    </>
  );
};

export default MobileFineBookForm;
