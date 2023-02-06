import { ButtonProps } from './index';
import styled from '@emotion/styled';

export const Button = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
