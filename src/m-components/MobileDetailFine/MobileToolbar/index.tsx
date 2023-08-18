import CheckboxContainer from '@/components/@common/Checkbox';
import DetailListCheckBox from '@/components/DetailFine/checkbox';
import useCheckListState from '@/hooks/useCheckListState';
import { sideModalState, ModalType } from '@/store/sideModalState';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import * as Style from './styles';
const MobileToolbar = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [sideModal, setSideModal] = useRecoilState(sideModalState);
  const moveToolbarPage = (type: ModalType) => {
    setSideModal({ type, isModal: true });
    navigate(`/m-group/${groupId}/book/alarm`);
  };
  const {
    checkDetailFineValues,
    checkedSize,
    setCheckDetailFine: { setInitCheckDetailFine },
  } = useCheckListState();

  const initCheckDetailFine = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setInitCheckDetailFine();
  };

  if (checkedSize === 0) return null;
  return (
    <Style.ToolbarContainer>
      <CheckboxContainer id={'checkDetailFineLength'} isChecked={!(checkedSize === 0)} onChange={(event: React.MouseEvent<HTMLInputElement>) => initCheckDetailFine(event)}>
        <CheckboxContainer.Checkbox as={DetailListCheckBox} />
        {/*    이 부분 props를 자연스럽게 넘겨주려면 이 방법 밖에?? function으로 넘겨주는 방법도 있긴한데,  이거는 rest props 안넘어옴 */}
      </CheckboxContainer>
      <Style.Label>{checkedSize}개 선택</Style.Label>
      <Style.DividingLine />
      <Style.Button onClick={() => moveToolbarPage('situation_change')}>납부여부 변경</Style.Button>
      <Style.DividingLine />

      <Style.Button onClick={() => moveToolbarPage('alarm_request')}>납부요청</Style.Button>
    </Style.ToolbarContainer>
  );
};

export default MobileToolbar;
