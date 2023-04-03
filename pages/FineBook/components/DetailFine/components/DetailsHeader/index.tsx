import { useNavigate, useParams } from 'react-router-dom';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from './styles';

export const DetailsHeader = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const closeDetails = () => {
    navigate(`/group/${groupId}/book`);
  };

  return (
    <Style.DetailsHeader>
      <Style.HeaderAlign>
        <Style.BackArrowIcon onClick={closeDetails}>{ARROW.DOUBLE_RIGHT}</Style.BackArrowIcon>
        <Style.Title>상세내역</Style.Title>
      </Style.HeaderAlign>
    </Style.DetailsHeader>
  );
};
