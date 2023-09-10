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

  box-shadow: 0px -6px 12px 0px rgba(45, 45, 45, 0.1);
  ${({ theme }) => theme.font.subhead_02};
`;

export const Label = styled.label`
  white-space: nowrap;
  padding: 2px 4px;
  color: #2d2d2d;
`;

export const DividingLine = styled.div`
  margin: 0 1rem;
  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_800};
  width: 2px;
  height: 17px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
`;

export const Button = styled.button`
  white-space: nowrap;
  ${({ theme }) => theme.font.subhead_02};
  color: #2d2d2d;
`;
