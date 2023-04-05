import { FOOTER_LINK } from '@/constants/ServiceLink';
import * as Style from './styles';

export const Footer = () => {
  return (
    <Style.Footer>
      <Style.FooterLinkBlock>
        <Style.PRIVACY href={FOOTER_LINK.PRIVACY} target="_blank" rel="noopnner noreferrer">
          개인정보 처리 방침
        </Style.PRIVACY>
        <Style.TERMS href={FOOTER_LINK.TERMS} target="_blank" rel="noopnner noreferrer">
          이용약관
        </Style.TERMS>
      </Style.FooterLinkBlock>
      <Style.FooterLinkBlock>©소심한총무 All rights Reserved.</Style.FooterLinkBlock>
    </Style.Footer>
  );
};
