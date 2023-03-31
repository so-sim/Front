import styled from '@emotion/styled';

export const Li = styled.li`
  list-style: disc;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.body_03}
  margin-bottom: 12px;
`;

export const Desc = styled.div`
  margin-left: 20px;
`;

export const UlContainer = styled.ul`
  margin-bottom: 20px;
  padding-left: 20px;
`;

export const Label = styled.label`
  ${({ theme }) => theme.font.subhead_02}
  margin-bottom: 40px;
  input {
    margin-right: 8px;
  }
  span {
    color: ${({ theme }) => theme.colors.red_400};
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
