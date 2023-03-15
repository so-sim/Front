import * as Style from './styles';
import { LOGO } from '@/assets/icons/Logo/index';
import { Paragraph } from '../Paragraph';
import { useState } from 'react';
import { LoginModal } from '../../../../common/Modal/LoginModal';

/** 여기에서 로그인 관련 수행 */
export const Header = () => {
  const [openModal, setOpenModal] = useState(false);

  const loginModalHandler = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <>
      <Style.Header>
        <Paragraph>
          <Style.HeaderLeft>
            {LOGO.SM}
            <Style.NavSection>
              <button>소심한 총무란</button>
              <button>의견 제안하기</button>
              <button>FAQ</button>
            </Style.NavSection>
          </Style.HeaderLeft>
          <Style.HeaderRight>
            <Style.Login onClick={loginModalHandler}>로그인/회원가입</Style.Login>
          </Style.HeaderRight>
        </Paragraph>
      </Style.Header>
      {<LoginModal isOpen={openModal} setIsOpen={loginModalHandler} />}
    </>
  );
};
