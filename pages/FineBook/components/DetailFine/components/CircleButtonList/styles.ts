import styled from '@emotion/styled';

export const CircleButtonList = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.neutral_300_b};
  box-shadow: 2px 0px 25px 7px rgba(156, 156, 156, 0.15);
`;

export const CircleButtonBox = styled.li`
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  &:first-of-type,
  &:hover {
    background: ${({ theme }) => theme.colors.neutral_400_b};
  }
  &:last-child {
    border: none;
  }
`;
