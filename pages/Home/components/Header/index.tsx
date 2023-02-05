import * as Style from './styles';
import Logo from '../../../../assets/icons/Logo.svg';

/** 여기에서 로그인 관련 수행 */
export const Header = () => {
  return (
    <Style.Header>
      <Style.HeaderLeft>
        <Style.Logo>
          <Logo />
          <h3>소심한 총무</h3>
        </Style.Logo>
        <Style.NavSection>
          <button>소심한 총무란</button>
          <button>의견 제안하기</button>
          <button>FAQ</button>
        </Style.NavSection>
      </Style.HeaderLeft>
      <Style.HeaderRight>
        <Style.Login>로그인/회원가입</Style.Login>
      </Style.HeaderRight>
    </Style.Header>
  );
};
