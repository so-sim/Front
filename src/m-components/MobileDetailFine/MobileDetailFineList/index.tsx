import { SYSTEM } from '@/assets/icons/System';
import CheckboxContainer from '@/components/@common/Checkbox';
import DetailListCheckBox from '@/components/DetailFine/checkbox';

import useCheckListState from '@/hooks/useCheckListState';
import { EventInfoListTest, SelectedEventInfo } from '@/types/event';
import { convertToPriceFormat } from '@/utils/convertFormat';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as Style from './styles';

type GroupedData = {
  [key: string]: SelectedEventInfo[];
};
type Props = {
  details: GroupedData;
  inViewElement: (node?: Element | null | undefined) => void;
};

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

const MobileDetailFineList = ({ details, inViewElement }: Props) => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const {
    checkDetailFineValues,
    checkDetailFineKeys,
    setCheckDetailFine: { setToggleCheckList },
    isChecked,
  } = useCheckListState();

  // const stringTonumber = checkedEventIdList.map((item) => Number(item));
  // const { data } = useGetDetailListById(Number(groupId), [...stringTonumber]);
  // 해당 부분은 알림클릭 시 이동되는 페이지 사용   ((테스트용으로 생성해보았습니다. 지우셔도 상관없습니다.))

  const goToFineBookDetail = (eventId: number) => {
    navigate(`/m-group/${groupId}/book/detail/${eventId}`);
  };

  const handleToggleCheckList = (event: React.MouseEvent<HTMLInputElement>, detail: SelectedEventInfo) => {
    event.stopPropagation();
    setToggleCheckList(detail);
  };

  return (
    <>
      <Style.DetailFineListContainer>
        {Object.values(details).map((item, index) => (
          <React.Fragment key={index}>
            <Style.DateText key={index}>{Object.keys(details)[index]}</Style.DateText>

            {item.map((item, index) => (
              <Style.DetailFineItem isChecked={isChecked(item.eventId)} onClick={() => goToFineBookDetail(item.eventId)} key={item.eventId + index}>
                <CheckboxContainer
                  id={String(item.eventId)}
                  isChecked={isChecked(item.eventId)}
                  onChange={(event: React.MouseEvent<HTMLInputElement>) => handleToggleCheckList(event, item)}
                >
                  <CheckboxContainer.Checkbox as={DetailListCheckBox} />
                </CheckboxContainer>
                <Style.ContentWrapper>
                  <Style.TopWrapper>
                    <Style.UserInfoText>
                      <p>{item.nickname}</p>
                    </Style.UserInfoText>
                    <Style.AmountText>{convertToPriceFormat(item.amount)}원</Style.AmountText>
                  </Style.TopWrapper>
                  <Style.DetailContextWrapper>
                    <Style.SituationBox situationType={item.situation}>
                      <Style.IconWrapper>{SITUATION_STATUS_ICON[item.situation]}</Style.IconWrapper>
                      {SITUATION_STATUS_TEXT[item.situation]}
                    </Style.SituationBox>
                    <Style.DescriptionContainer>
                      <Style.DescriptionGround>{item.ground}</Style.DescriptionGround>
                      <Style.Division />
                      <Style.DescriptionMemo>{item.memo}</Style.DescriptionMemo>
                    </Style.DescriptionContainer>
                  </Style.DetailContextWrapper>
                </Style.ContentWrapper>
              </Style.DetailFineItem>
            ))}
            <div style={{ height: '5px' }} ref={inViewElement}></div>
          </React.Fragment>
        ))}
      </Style.DetailFineListContainer>
    </>
  );
};

export default MobileDetailFineList;
