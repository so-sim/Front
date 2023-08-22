import styled from '@emotion/styled';

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  width: 100%;

  padding: 2rem 2.25rem;

  z-index: 100;

  background-color: white;

  ${({ theme }) => theme.font.subhead_02};
`;

export const Label = styled.label`
  padding: 2px 4px;
`;

export const DividingLine = styled.div`
  margin: 0 1rem;
  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_800};
  width: 1px;
  height: 17px;
  background-color: ${({ theme }) => theme.colors.neutral_300_b};
`;

export const Button = styled.button`
  ${({ theme }) => theme.font.subhead_02};
`;
