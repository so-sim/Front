import styled from '@emotion/styled';

export const TableHead = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 30px 100px 120px 116px 108px 1fr;

  position: relative;

  border: 2px solid ${({ theme }) => theme.colors.neutral_300_b};
  border-radius: 4px;
  margin-bottom: 4px;

  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;

export const Element = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  position: relative;
  &,
  & > * {
    ${({ theme }) => theme.font.subhead_02}
    color: ${({ theme }) => theme.colors.secondary_900}
  }
`;

export const PointerElement = styled(Element)`
  cursor: pointer;
`;

export const Arrow = styled.span`
  height: 16px;
  margin-left: 8px;
`;

export const PaymentControlWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  position: absolute;
  bottom: 0;

  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
  padding: 4px 8px;

  background-color: white;

  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_800};
  z-index: 999;
`;

export const Label = styled.label`
  padding: 2px 4px;
`;

export const PaymentControlButton = styled.button`
  border-radius: 2px;
  padding: 2px 4px;

  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_800};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_300_b};
  }
`;

export const DividingLine = styled.div`
  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_800};
  width: 1px;
  height: 17px;
  background-color: ${({ theme }) => theme.colors.neutral_300_b};
`;
