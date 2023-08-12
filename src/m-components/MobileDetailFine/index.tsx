import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dateState } from '@/store/dateState';
import { DetailFilter } from '@/store/detailFilter';
import { useRecoilState } from 'recoil';
import { useGetDetailList } from '@/queries/Detail';
import MobileDetailFineList from './MobileDetailFineList';
import { useGetMobileDetailList } from '@/queries/Detail/useGetMobileDetailList';
import dayjs from 'dayjs';
import { useInView } from 'react-intersection-observer';
import { EventInfoListTest, SelectedEventInfo } from '@/types/event';
import FilterBottomSheet from '../BottomSheet/FilterBottomSheet';
import { SYSTEM } from '@/assets/icons/System';

import * as Style from './styles';
import MobileLayout from '@/layouts/Mobile/MobileLayout';
import { searchMemberState } from '@/store/searchMemberState';
import { USER } from '@/assets/icons/User';

type GroupedData = {
  [key: string]: SelectedEventInfo[];
};

const MobileDetailFine = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [detailFilter, setDetailFilter] = useState<DetailFilter>({ nickname: '', situation: '', page: 0, size: 16, groupId: Number(groupId) });
  const [openFilterSheet, setOpenFilterSheet] = useState(false);

  const handleOpenFilterSheet = () => {
    setOpenFilterSheet((prev) => !prev);
  };

  const [searchMember, setSearchMember] = useRecoilState(searchMemberState);
  const [calendarDate, setCalendarDate] = useRecoilState(dateState);

  const cancelSearchNickname = () => {
    setSearchMember({ nickname: '' });
  };

  const navigateToMemberSearchPage = () => {
    navigate(`/m-group/${groupId}/book/member-search`);
  };

  useEffect(() => {
    setCalendarDate((prev) => ({ ...prev, startDate: dayjs('2023.08.09'), endDate: dayjs('2023.08.10') }));
  }, []);

  const { data, hasNextPage, fetchNextPage } = useGetMobileDetailList(detailFilter, calendarDate);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const [GroupedListByDate, setGroupedListByDate] = useState({});

  useEffect(() => {
    const groupedData: GroupedData = data?.pages.reduce((groups: any, page) => {
      page.content.eventList.forEach((item) => {
        const date = item.date;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
      });
      return groups;
    }, {});

    setGroupedListByDate((prev) => ({ ...prev, ...groupedData }));
  }, [data]);

  return (
    <MobileLayout location="GROUP">
      <div>
        <div>데이트컨트롤러</div>
        <Style.FilterRow>
          <Style.SearchMemberInput hasSearchedNickname={false}>
            {SYSTEM.SEARCH_BLACK}
            {searchMember.nickname ? (
              <Style.SelectedMember>
                <Style.SelectedNickname onClick={navigateToMemberSearchPage}>
                  {USER.PERSON_SM}
                  {searchMember.nickname}
                </Style.SelectedNickname>
                <Style.CancelButton onClick={cancelSearchNickname}>{SYSTEM.CLOSE_SM}</Style.CancelButton>
              </Style.SelectedMember>
            ) : (
              <div onClick={navigateToMemberSearchPage}>팀원 검색</div>
            )}
          </Style.SearchMemberInput>
          <Style.FilterButton onClick={handleOpenFilterSheet}>{SYSTEM.FILTER}필터</Style.FilterButton>
        </Style.FilterRow>

        <div>전체 체크박스</div>
        <MobileDetailFineList details={GroupedListByDate} />

        <div ref={ref} />
      </div>
      {openFilterSheet && (
        <FilterBottomSheet //
          detailFilter={detailFilter}
          setDetailFilter={setDetailFilter}
          onClose={handleOpenFilterSheet}
        />
      )}
    </MobileLayout>
  );
};

export default MobileDetailFine;
