import { SYSTEM } from '@/assets/icons/System';
import CheckboxContainer from '@/components/@common/Checkbox';
import DetailListCheckBox from '@/components/DetailFine/checkbox';

import useCheckListState from '@/hooks/useCheckListState';
import { useGetDetailListById } from '@/queries/Detail/useGetDetailListById';
import { EventInfoListTest, SelectedEventInfo } from '@/types/event';
import { ServerResponse } from '@/types/serverResponse';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

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
  const {
    checkDetailFineValues,
    checkDetailFineKeys,
    setCheckDetailFine: { setToggleCheckList },
    isChecked,
  } = useCheckListState();

  // const stringTonumber = checkedEventIdList.map((item) => Number(item));
  // const { data } = useGetDetailListById(Number(groupId), [...stringTonumber]);
  // 해당 부분은 알림클릭 시 이동되는 페이지 사용   ((테스트용으로 생성해보았습니다. 지우셔도 상관없습니다.))

  return (
    <>
      <DetailFineListContainer>
        {Object.values(details).map((item, index) => (
          <>
            <DateText>{Object.keys(details)[index]}</DateText>

            {item.map((item) => (
              <DetailFineItem>
                <CheckboxContainer
                  id={String(item.eventId)}
                  isChecked={isChecked(item.eventId)}
                  // 이거는 전체 눌렀을 때 체크가 되야겠죠?
                  onChange={() => setToggleCheckList(item)}
                >
                  <CheckboxContainer.Checkbox as={DetailListCheckBox} />
                  {/*    이 부분 props를 자연스럽게 넘겨주려면 이 방법 밖에?? function으로 넘겨주는 방법도 있긴한데,  이거는 rest props 안넘어옴 */}
                </CheckboxContainer>
                <ContentWrapper>
                  <TopWrapper>
                    <UserInfoText>
                      <p>{item.nickname}</p>
                    </UserInfoText>
                    <AmountText>{item.amount}원</AmountText>
                  </TopWrapper>
                  <DetailContextWrapper>
                    <SituationBox>
                      <IconWrapper>{SituationStatusIcon[item.situation]}</IconWrapper>
                      {item.situation}
                    </SituationBox>
                    <DescriptionContainer>
                      <DescriptionGround>{item.ground}</DescriptionGround>
                      <Division />
                      <DescriptionMemo>{item.memo}</DescriptionMemo>
                    </DescriptionContainer>
                  </DetailContextWrapper>
                </ContentWrapper>
              </DetailFineItem>
            ))}
          </>
        ))}
      </DetailFineListContainer>
    </>
  );
};

export default MobileDetailFineList;

const DetailFineListContainer = styled.ul`
  padding-top: 0.75rem;
`;

const DateText = styled.p`
  ${({ theme }) => theme.font.body_01};
  color: ${({ theme }) => theme.colors.secondary_500};
`;

const DetailFineItem = styled.li`
  display: flex;
  align-items: center;
  padding-top: 0.675rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding-right: 0.5rem;
`;

const UserInfoText = styled.p`
  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_900};
`;

const SituationBox = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => css`
    border-radius: 0.25rem;
    background-color: ${theme.colors.blue_200};
    color: ${theme.colors.primary_600};
  `}
`;

const DetailContextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const AmountText = styled.p`
  margin-left: auto;
  ${({ theme }) => theme.font.subhead_02};
  color: ${({ theme }) => theme.colors.secondary_800};
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 0 0.25rem;
`;
const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 0.125rem;
`;

const DescriptionGround = styled.span`
  ${({ theme }) => theme.font.subhead_02};

  color: ${({ theme }) => theme.colors.secondary_900};
`;
const Division = styled.div`
  width: 1px;
  height: 10px;

  background-color: ${({ theme }) => theme.colors.neutral_400_b};
`;
const DescriptionMemo = styled.span`
  ${({ theme }) => theme.font.subhead_02};

  color: ${({ theme }) => theme.colors.secondary_600};
`;
