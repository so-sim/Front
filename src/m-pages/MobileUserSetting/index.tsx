import { ARROW } from '@/assets/icons/Arrow';
import useWithdrawal from '@/hooks/User/useWithdrawal';
import MobileLayout from '@/layouts/Mobile';
import MobileHeader from '@/layouts/Mobile/components/MobileHeader';
import { userState } from '@/store/userState';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as Style from './styles';

const MobileUserSetting = () => {
  const navigate = useNavigate();
  const [userData] = useRecoilState(userState);

  const goBack = () => {
    navigate(-1);
  };

  const { onClickWithdrawal } = useWithdrawal();

  return (
    <MobileLayout>
      <MobileHeader title="환경설정" left={{ onClick: goBack, icon: ARROW.LEFT }} />
      <Style.Content>
        <Style.Text>연동된 소셜 계정</Style.Text>
        <Style.Kakao>카카오 간편 로그인</Style.Kakao>
        <Style.Email>{userData.email}</Style.Email>
        <Style.WithDrwalBtn onClick={onClickWithdrawal}>회원 탈퇴</Style.WithDrwalBtn>
      </Style.Content>
    </MobileLayout>
  );
};

export default MobileUserSetting;
