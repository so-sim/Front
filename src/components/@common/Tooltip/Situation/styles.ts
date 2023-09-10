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
  ${({ theme }) => theme.font.body_02};
`;

export const Asterisk = styled.span`
  color: ${({ theme }) => theme.colors.system_red_200};
  ${({ theme }) => theme.font.subhead_02}
`;

export const Asterisk2 = styled(Asterisk)`
  margin-left: 2px;
`;

export const DescWrapper = styled.div`
  width: 100%;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.secondary_400};
  ${({ theme }) => theme.font.body_01};
  display: flex;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  & > button {
    margin: 4px 0;
  }
`;
