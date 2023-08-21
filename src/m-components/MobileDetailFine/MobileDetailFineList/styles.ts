import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const DetailFineListContainer = styled.ul`
  position: relative;
  padding: 0.75rem 1rem 0;
`;

export const DateText = styled.p`
  padding-top: 1rem;
  ${({ theme }) => theme.font.body_01};
  color: ${({ theme }) => theme.colors.secondary_500};
`;

export const DetailFineItem = styled.li`
  display: flex;
  align-items: center;
  padding-top: 0.675rem;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  padding-right: 0.5rem;
`;

export const UserInfoText = styled.p`
  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const SituationBox = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => css`
    border-radius: 0.25rem;
    background-color: ${theme.colors.blue_200};
    color: ${theme.colors.primary_600};
  `}
`;

export const DetailContextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const AmountText = styled.p`
  margin-left: auto;
  ${({ theme }) => theme.font.subhead_02};
  color: ${({ theme }) => theme.colors.secondary_800};
`;

export const TopWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 0 0.25rem;
`;
export const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 0.125rem;
`;

export const DescriptionGround = styled.span`
  ${({ theme }) => theme.font.subhead_02};

  color: ${({ theme }) => theme.colors.secondary_900};
`;
export const Division = styled.div`
  width: 1px;
  height: 10px;

  background-color: ${({ theme }) => theme.colors.neutral_400_b};
`;
export const DescriptionMemo = styled.span`
  ${({ theme }) => theme.font.subhead_02};

  color: ${({ theme }) => theme.colors.secondary_600};
`;
