import { Situation } from '@/types/event';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type CircleDropButtonProps = { situation: Situation };

export const StatusButton = styled.button<CircleDropButtonProps>`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  margin: 8px 10px;
  border-radius: 16px;
  color: ${({ theme, situation }) => (situation === '미납' ? theme.colors.red_600 : situation === '확인중' ? theme.colors.orange_600 : theme.colors.primary_600)};
  border: 2px solid ${({ theme, situation }) => (situation === '미납' ? theme.colors.red_600 : situation === '확인중' ? theme.colors.orange_600 : theme.colors.primary_600)};
  background-color: ${({ theme, situation }) => (situation === '미납' ? theme.colors.red_200 : situation === '확인중' ? theme.colors.orange_200 : theme.colors.blue_200)};
`;

export const MarkIconWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-right: 0.25rem;
  /* padding-bottom: 0.125rem; */
`;

export const Text = styled.span`
  display: flex;
  justify-content: flex-start;
  ${({ theme }) => theme.font.subhead_01}
  width: 52px;
  margin-right: 4px;
`;

const SITUATION_COLOR_LIST = {
  미납: '#fabda9',
  완납: '#bdd5fa',
  확인중: '#fada9d',
};

export const Icon = styled.span<{ $situation: Situation; $isNoAuthority?: boolean }>`
  width: 16px;
  height: 16px;
  ${({ $isNoAuthority, $situation }) =>
    $isNoAuthority &&
    css`
      & rect {
        fill: ${SITUATION_COLOR_LIST[$situation]};
      }
    `}
`;
