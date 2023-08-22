import styled from '@emotion/styled';

export const CheckboxRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const AllCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const ChecboxLabel = styled.span`
  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const AmountLebel = styled.span`
  ${({ theme }) => theme.font.caption};
  color: ${({ theme }) => theme.colors.secondary_800};
`;

export const Amount = styled.span`
  ${({ theme }) => theme.font.subhead_02};
  color: ${({ theme }) => theme.colors.secondary_800};
`;
