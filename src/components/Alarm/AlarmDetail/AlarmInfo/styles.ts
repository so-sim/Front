import styled from '@emotion/styled';

export const Title = styled.h2`
  padding-bottom: 0.5rem;
  ${({ theme }) => theme.font.subhead_04};

  color: ${({ theme }) => theme.colors.secondary_800};
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding-bottom: 0.75rem;
`;

export const ProfimeText = styled.p`
  ${({ theme }) => theme.font.subhead_04};

  color: ${({ theme }) => theme.colors.secondary_800};
`;

export const Description = styled.p`
  padding-bottom: 0.125rem;

  ${({ theme }) => theme.font.body_01};

  color: ${({ theme }) => theme.colors.secondary_600};
`;

export const SubTitle = styled.p`
  padding-bottom: 0.5rem;
  ${({ theme }) => theme.font.body_03};

  color: ${({ theme }) => theme.colors.secondary_900};
`;
