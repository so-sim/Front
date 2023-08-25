import styled from '@emotion/styled';

interface TagProps {
  color: 'blue' | 'orange' | 'red';
}

export const Body = styled.div`
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.secondary_100};
  ${({ theme }) => theme.font.body_02};
`;

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
`;

export const Tag = styled.span<TagProps>`
  display: flex;
  display: inline-block;
  width: fit-content;
  font-size: 16px;
  gap: 4px;
  align-items: center;
  transform: scale(0.8);
  vertical-align: middle;
  padding: 0 6px;
  height: 32px;
  border: 2px solid;
  border-radius: 20px;
  border-color: ${({ theme, color }) => {
    const colors = {
      blue: theme.colors.primary_600,
      red: theme.colors.red_600,
      orange: theme.colors.orange_600,
    };
    return colors[color];
  }};
  color: ${({ theme, color }) => {
    const colors = {
      blue: theme.colors.primary_600,
      red: theme.colors.red_600,
      orange: theme.colors.orange_600,
    };
    return colors[color];
  }};
  background-color: ${({ theme, color }) => {
    const colors = {
      blue: theme.colors.neutral_200_b,
      red: theme.colors.red_200,
      orange: theme.colors.orange_200,
    };
    return colors[color];
  }};

  span {
    vertical-align: middle;
    ${({ theme }) => theme.font.subhead_02}
  }
`;
