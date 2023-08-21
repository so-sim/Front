import { SYSTEM } from '@/assets/icons/System';
import CheckboxContainer from '@/components/@common/Checkbox';
import DetailListCheckBox from '@/components/DetailFine/checkbox';

import useCheckListState from '@/hooks/useCheckListState';
import { useGetDetailListById } from '@/queries/Detail/useGetDetailListById';
import { sideModalState } from '@/store/sideModalState';
import { EventInfoListTest, SelectedEventInfo } from '@/types/event';
import { ServerResponse } from '@/types/serverResponse';
import { useNavigate, useParams } from 'react-router-dom';

import * as Style from './styles';

type GroupedData = {
  [key: string]: SelectedEventInfo[];
};
type Props = {
  details: GroupedData;
};

const SituationStatusIcon = {
  미납: SYSTEM.MOBILENON,
  완납: SYSTEM.MOBILEFULL,
  확인중: SYSTEM.MOBILECON,
};

const MobileDetailFineList = ({ details }: Props) => {
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

  console.log(checkDetailFineValues);

  return (
    <>
      <Style.DetailFineListContainer>
        {Object.values(details).map((item, index) => (
          <>
            <Style.DateText key={index}>{Object.keys(details)[index]}</Style.DateText>

            {item.map((item) => (
              <Style.DetailFineItem onClick={() => goToFineBookDetail(item.eventId)}>
                <CheckboxContainer
                  id={String(item.eventId)}
                  isChecked={isChecked(item.eventId)}
                  // 이거는 전체 눌렀을 때 체크가 되야겠죠?
                  onChange={(event: React.MouseEvent<HTMLInputElement>) => handleToggleCheckList(event, item)}
                >
                  <CheckboxContainer.Checkbox as={DetailListCheckBox} />
                  {/*    이 부분 props를 자연스럽게 넘겨주려면 이 방법 밖에?? function으로 넘겨주는 방법도 있긴한데,  이거는 rest props 안넘어옴 */}
                </CheckboxContainer>
                <Style.ContentWrapper>
                  <Style.TopWrapper>
                    <Style.UserInfoText>
                      <p>{item.nickname}</p>
                    </Style.UserInfoText>
                    <Style.AmountText>{item.amount}원</Style.AmountText>
                  </Style.TopWrapper>
                  <Style.DetailContextWrapper>
                    <Style.SituationBox>
                      <Style.IconWrapper>{SituationStatusIcon[item.situation]}</Style.IconWrapper>
                      {item.situation}
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
          </>
        ))}
      </Style.DetailFineListContainer>
    </>
  );
};

export default MobileDetailFineList;
