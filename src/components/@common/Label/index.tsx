import React, { FC, PropsWithChildren, CSSProperties } from 'react';
import * as Style from './styles';

interface LabelProps extends PropsWithChildren {
  title: string;
  flexDirection?: CSSProperties['flexDirection'];
  width?: string;
  margin?: string;
}

const Label: FC<LabelProps> = ({ children, title, flexDirection = 'row', width = '80px', margin = '12px' }) => {
  return (
    // 왜 이러는지 모르겠어요,....
    <Style.Label flexDirection={flexDirection} margin={margin} onClick={(e) => e.preventDefault()}>
      <Style.LabelText flexDirection={flexDirection} width={width}>
        {title}
      </Style.LabelText>
      <Style.ArrangeRow>{children}</Style.ArrangeRow>
    </Style.Label>
  );
};
export default Label;
