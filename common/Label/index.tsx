import React, { FC, PropsWithChildren, CSSProperties } from 'react';
import * as Style from './styles';

interface LabelProps extends PropsWithChildren {
  title: string;
  flexDirection?: CSSProperties['flexDirection'];
  width?: string;
}

export const Label: FC<LabelProps> = ({ children, title, flexDirection = 'row', width = '80px' }) => {
  return (
    <Style.Label flexDirection={flexDirection}>
      <Style.LabelText flexDirection={flexDirection} width={width}>
        {title}
      </Style.LabelText>
      <Style.ArrangeRow>{children}</Style.ArrangeRow>
    </Style.Label>
  );
};
