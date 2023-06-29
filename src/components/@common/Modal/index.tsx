import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { SYSTEM } from '../../../assets/icons/System';
import * as Style from './styles';

export interface PropsWithChild {
  children: ReactNode | string;
}

export interface ModalProps extends PropsWithChild {
  height?: string;
  width?: string;
  borderRadius?: string;
  onClick?: () => void;
}
export interface ModalHeaderProps extends PropsWithChild {
  onClick?: () => void;
  align?: 'center' | 'start';
  margin?: string;
}

export interface ModalFooterProps extends PropsWithChild {
  flexDirection?: 'column' | 'row';
}

const ModalFrame: FC<ModalProps> = ({ width = '376px', height = '283px', onClick, children, borderRadius = '4px' }) => {
  const portal = document.getElementById('portal') as HTMLDivElement;

  return createPortal(
    <>
      <Style.Overlay onClick={onClick} />
      <Style.ModalFrame width={width} height={height} borderRadius={borderRadius}>
        {children}
      </Style.ModalFrame>
    </>,
    portal,
  );
};

const ModalHeader: FC<ModalHeaderProps> = ({ children, onClick, align = 'center', margin = '20px', ...args }) => {
  return (
    <Style.ModalHeader {...args} align={align} margin={margin}>
      {onClick && (
        <Style.HeaderIcon>
          <Style.CloseIcon onClick={onClick}>{SYSTEM.CLOSE_LG}</Style.CloseIcon>
        </Style.HeaderIcon>
      )}
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
