import styled from '@emotion/styled';

export const SituationControlWrapper = styled.div`
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
  z-index: 400;
`;

export const Label = styled.label`
  padding: 2px 4px;
`;

export const SituationControlButton = styled.button`
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
