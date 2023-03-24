import * as Style from './styles';
import { LOGO } from '@/assets/icons/Logo/index';
import { Paragraph } from '../Paragraph';
import { useState } from 'react';
import { AuthModal } from '@/common/Modal/LoginModal';
import { GNB_LINK } from '@/constants/ServiceLink';

const GNBLinkList = [
  { title: '소심한 총무란', href: GNB_LINK.SERVICE },
  { title: '의견 제안하기', href: GNB_LINK.SUGGEST },
  { title: 'FAQ', href: GNB_LINK.FAQ },
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
            {LOGO.SM}
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
