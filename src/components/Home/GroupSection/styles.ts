import styled from '@emotion/styled';

export const GroupSection = styled.section`
  width: 100%;
  padding: 24px 0 48px 0;
  margin: 0 12px;
`;

export const Title = styled.div`
  margin-bottom: 16px;
  ${({ theme }) => theme.font.headline}
`;

export const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: auto;
`;
