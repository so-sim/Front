import { FOOTER_LINK } from '@/constants/ServiceLink';
import * as Style from './styles';

export const Footer = () => {
  return (
    <Style.Footer>
      <Style.FooterLink href={FOOTER_LINK.PRIVACY} target="_blank" rel="noopnner noreferrer">
        개인정보 처리 방침
      </Style.FooterLink>
    </Style.Footer>
  );
};
