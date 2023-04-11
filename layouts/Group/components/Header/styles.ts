import styled from '@emotion/styled';

export const Header = styled.header`
  width: 100%;
  height: 68px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_300_b};
  div {
    cursor: pointer;
  }
  button {
    position: relative;
  }
  span {
    cursor: pointer;
  }
`;

export const UserConfigButton = styled.button`
  display: flex;
  align-items: center;
  position: relative;
`;
