import React, { FC, PropsWithChildren, CSSProperties } from 'react';
import * as Style from './style';

interface LabelProps extends PropsWithChildren {
  title: string;
  flexDirection?: CSSProperties['flexDirection'];
}

export const Label: FC<LabelProps> = ({ children, title, flexDirection = 'row' }) => {
  return (
    <Style.Label flexDirection={flexDirection}>
      <Style.LabelText flexDirection={flexDirection}>{title}</Style.LabelText>
      <Style.ArrangeRow>{children}</Style.ArrangeRow>
    </Style.Label>
  );
};
