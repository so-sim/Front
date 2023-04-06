import styled from '@emotion/styled';

export const MemberContainer = styled.div`
  padding: 14px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
`;

export const Nickname = styled.span`
  ${({ theme }) => theme.font.subhead_03};
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SVG = styled.div`
  cursor: pointer;
  position: relative;
`;
