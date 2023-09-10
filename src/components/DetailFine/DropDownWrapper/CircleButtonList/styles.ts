import styled from '@emotion/styled';

export const CircleButtonList = styled.ul`
  position: absolute;
  display: flex;
  z-index: 10;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};

  box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.secondary_500} inset;
`;

export const CircleButtonBox = styled.li`
  &:hover {
    background: ${({ theme }) => theme.colors.neutral_300_b};
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.secondary_500} inset !important;
  }

  /* inner border ... shadow 를 주로 쓰긴 했는데, 양쪽 2,3 단면만을 처리하는 것은 잘 모르겠습니다.. */
  &:last-child {
    border: none;
  }
`;
