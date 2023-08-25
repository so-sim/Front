import { Desc } from './../../Modal/ConfirmModal/styels';
import styled from '@emotion/styled';

export const Subhead = styled.div`
  ${({ theme }) => theme.font.subhead_02};
  margin-bottom: 8px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.secondary_100};
`;

export const Body = styled.div`
  text-align: start;
  color: white;
  margin-bottom: 12px;
  ${({ theme }) => theme.font.body_02};
`;

export const Asterisk = styled.span`
  color: ${({ theme }) => theme.colors.system_red_200};
  ${({ theme }) => theme.font.subhead_02}
`;

export const Asterisk2 = styled(Asterisk)`
  margin-left: -8px;
`;

export const DescWrapper = styled.div`
  width: 100%;
  white-space: pre-wrap;
  text-align: start;
  color: ${({ theme }) => theme.colors.secondary_400};
  ${({ theme }) => theme.font.body_01};
  display: flex;
  align-items: center;
`;
