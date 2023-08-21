import { ARROW } from '@/assets/icons/Arrow';
import { SYSTEM } from '@/assets/icons/System';
import useSearchParticipant from '@/hooks/Member/useSearchParticipant';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import { detailFineState } from '@/store/detailFineState';
import { searchMemberState } from '@/store/searchMemberState';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as Style from './styles';

const MobileMemberSearch = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const [searchMember, setSearchMember] = useRecoilState(searchMemberState);
  const [isOpen, setIsOpen] = useRecoilState(detailFineState);

  const goBack = () => {
    navigate(-1);
  };

  const searchTargetMemberList = (nickname: string) => {
    setSearchMember({ ...searchMember, nickname });
    setIsOpen(true);
    navigate(`/m-group/${groupId}/book`);
  };

  const { nickname, filteredMemberList, initNickname, searchNickname, inputRef } = useSearchParticipant(searchMember.nickname);

  return (
    <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="">
      <Style.SearchMemberInput>
        {SYSTEM.SEARCH_BLACK}
        <input
          type="text" //
          placeholder="팀원 검색"
          value={nickname}
          onChange={searchNickname}
          ref={inputRef}
        />
      </Style.SearchMemberInput>
      <Style.MemberList>
        {filteredMemberList.map(({ nickname, withdraw }) => {
          return (
            <Style.MemberListItem key={nickname} onClick={() => searchTargetMemberList(nickname)}>
              {SYSTEM.SEARCH_GRAY}
              {nickname}
              {withdraw && <span>탈퇴</span>}
            </Style.MemberListItem>
          );
        })}
      </Style.MemberList>
    </ModalPageLayout>
  );
};

export default MobileMemberSearch;
