import React, { FC, ReactNode } from 'react';
import { SYSTEM } from '../../assets/icons/System';
import * as Style from './styles';

export interface PropsWithChild {
  children: ReactNode | string;
}

export interface ModalProps extends PropsWithChild {
  isOpen: boolean;
  height?: string;
  width?: string;
  borderRadius?: string;
  onClick?: () => void;
}
export interface ModalHeaderProps extends PropsWithChild {
  onClick?: () => void;
}

export interface ModalFooterProps extends PropsWithChild {
  flexDirection?: 'column' | 'row';
}

const ModalFrame: FC<ModalProps> = ({ isOpen, width = '376px', height = '283px', onClick, children, borderRadius = '4px' }) => {
  return (
    <>
      <Style.Overlay isOpen={isOpen} onClick={onClick} />
      <Style.ModalFrame isOpen={isOpen} width={width} height={height} borderRadius={borderRadius}>
        {children}
      </Style.ModalFrame>
    </>
  );
};

const ModalHeader: FC<ModalHeaderProps> = ({ children, onClick, ...args }) => {
  return (
    <Style.ModalHeader {...args}>
      {onClick && <Style.CloseIcon onClick={onClick}>{SYSTEM.CLOSE}</Style.CloseIcon>}
      <Style.HeaderTitle>{children}</Style.HeaderTitle>
    </Style.ModalHeader>
  );
};

const ModalBody: FC<PropsWithChild> = ({ children, ...args }) => {
  return <Style.ModalBody {...args}>{children}</Style.ModalBody>;
};

const ModalFooter: FC<ModalFooterProps> = ({ children, flexDirection = 'row', ...args }) => {
  return (
    <Style.ModalFooter flexDirection={flexDirection} {...args}>
      {children}
    </Style.ModalFooter>
  );
};

const Modal = {
  Frame: ModalFrame,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
};

export default Modal;
