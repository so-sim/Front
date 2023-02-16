import styled from '@emotion/styled';

export const DropDownBox = styled.div`
  vertical-align: center;
  display: flex;
  align-items: center;
  position: relative;
  width: 148px;
  height: 32px;
  padding: 4px 12px;
  background: ${({ theme }) => theme.colors.secondary_200};
  border-radius: 4px;
`;

export const Text = styled.span`
  width: 96px;
  margin-right: 4px;
`;

export const ArrowIcon = styled.span`
  margin-top: 4px;
  cursor: pointer;
`;
