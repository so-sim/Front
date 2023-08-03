import styled from '@emotion/styled';

export const Card = styled.li<{ size: 'sm' | 'md' }>`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary_100};
  overflow: hidden;
  cursor: pointer;
  max-width: 220px;
  width: 100%;
  height: ${({ size }) => (size === 'sm' ? '176px' : '200px')};
`;
