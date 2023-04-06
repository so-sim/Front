import * as Style from './styles';
import { LOGO } from '@/assets/icons/Logo/index';
import { Paragraph } from '../Paragraph';
import { useState } from 'react';
import { AuthModal } from '@/common/Modal/LoginModal';
import { GNB_LINK } from '@/constants/ServiceLink';

const GNBLinkList = [
  { title: '서비스 소개', href: GNB_LINK.SERVICE },
  { title: '의견 남기기', href: GNB_LINK.SUGGEST },
  { title: '이용 가이드', href: GNB_LINK.FAQ },
];

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
            <Style.HeaderLogo onClick={() => window.location.reload()}>{LOGO.SM}</Style.HeaderLogo>
            <Style.NavSection>
              {GNBLinkList.map((list) => (
                <Style.GNBLink href={list.href} target="_blank" rel="noopnner noreferrer" key={list.title}>
                  {list.title}
                </Style.GNBLink>
              ))}
            </Style.NavSection>
          </Style.HeaderLeft>
          <Style.HeaderRight>
            <Style.Login onClick={loginModalHandler}>로그인/회원가입</Style.Login>
          </Style.HeaderRight>
        </Paragraph>
      </Style.Header>
      {openModal && <AuthModal modalHandler={loginModalHandler} />}
    </>
  );
};
