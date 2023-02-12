import React, { FC, PropsWithChildren, CSSProperties } from 'react';
import * as Style from './style';

interface ModalLabelProps extends PropsWithChildren {
  title: string;
  flexDirection?: CSSProperties['flexDirection'];
}

export const ModalLabel: FC<ModalLabelProps> = ({ children, title, flexDirection = 'row' }) => {
  return (
    <Style.Label flexDirection={flexDirection}>
      <Style.LabelText>{title}</Style.LabelText>
      <Style.ArrangeRow>{children}</Style.ArrangeRow>
    </Style.Label>
  );
};
