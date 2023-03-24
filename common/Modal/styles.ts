import { ModalProps, ModalFooterProps } from './index';
import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.secondary_900};
  opacity: 0.3;
  z-index: 10;
  width: 100%;
  height: 100%;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

export const ModalFrame = styled.div<ModalProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 20;
  background-color: white;
  padding: 24px 32px;
`;

export const ModalHeader = styled.div<{ align: 'center' | 'start' }>`
  ${({ theme }) => theme.font.headline};
  width: 100%;
  text-align: ${({ align }) => align === 'center' && 'center'};
  margin-bottom: 20px;
`;

export const HeaderIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

export const CloseIcon = styled.div`
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
  margin-top: 32px;
`;
