import { ModalProps, ModalFooterProps, ModalHeaderProps } from './index';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const Overlay = styled.div`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.secondary_900};
  opacity: 0.3;
  z-index: 9999;
  width: 100%;
  height: 100%;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

export const ModalFrame = styled.div<ModalProps>`
  width: ${(props) => props.width};
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${(props) => props.borderRadius};
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 9999;
  background-color: white;
  padding: ${isMobile ? '24px' : '24px 32px'};

  box-shadow: 2px 0px 25px 7px rgba(156, 156, 156, 0.15);
`;

export const ModalHeader = styled.div<ModalHeaderProps>`
  ${({ theme }) => (isMobile ? theme.font.subhead_04 : theme.font.headline)};
  width: 100%;
  text-align: ${({ align }) => align === 'center' && 'center'};
  margin-bottom: ${(props) => props.margin};
`;

export const HeaderIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

export const CloseIcon = styled.div`
  height: 24px;
  cursor: pointer;
`;

export const HeaderTitle = styled.span``;

export const ModalBody = styled.div`
  ${({ theme }) => theme.font.body_02};
  width: 100%;
  text-align: center;
`;

export const ModalFooter = styled.div<Pick<ModalFooterProps, 'flexDirection'>>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  gap: 12px;
  margin-top: ${isMobile ? '24px' : '32px'};
`;
