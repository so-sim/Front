import { SYSTEM } from '@/assets/icons/System';
import { USER } from '@/assets/icons/User';
import { GA } from '@/constants/GA';
import { searchMemberState } from '@/store/searchMemberState';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as Style from '../styles';

type Props = {
  openFilterSheet: () => void;
};

const MobileFilterController = ({ openFilterSheet }: Props) => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const cancelSearchNickname = () => {
    setSearchMember({ nickname: '' });
  };

  const navigateToMemberSearchPage = () => {
    navigate(`/m-group/${groupId}/book/member-search`);
  };
  const [searchMember, setSearchMember] = useRecoilState(searchMemberState);

  return (
    <Style.FilterRow>
      <Style.SearchMemberInput>
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
          <div onClick={navigateToMemberSearchPage} id={GA.SEARCH}>
            팀원 검색
          </div>
        )}
      </Style.SearchMemberInput>
      <Style.FilterButton onClick={openFilterSheet} id={GA.FILTER.FILTER}>
        {SYSTEM.FILTER}필터
      </Style.FilterButton>
    </Style.FilterRow>
  );
};

export default MobileFilterController;
