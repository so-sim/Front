import styled from '@emotion/styled';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 96px;
`;

export const ProgressBar = styled.div`
  position: relative;
  padding: 0px;
  gap: 4px;
  width: calc(100% - 48px);
  margin: 20px 24px 12px 24px;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.neutral_300_b};
  border-radius: 12px;
`;

interface ProgressProps {
  pageState: 'CONFIRM' | 'REASON';
}

export const Progress = styled.div<ProgressProps>`
  position: absolute;
  width: ${(props) => (props.pageState === 'CONFIRM' ? '50%' : '100%')};
  height: 10px;
  transition: width 1s;
  background-color: ${({ theme }) => theme.colors.primary_500};
  border-radius: 12px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 12px;
  padding: 24px;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.font.subhead_04};
  color: ${({ theme }) => theme.colors.secondary_900};
  margin-bottom: 32px;
  white-space: pre;
`;

export const SubTitle = styled.span`
  ${({ theme }) => theme.font.body_01}
  margin-top: 12px;
`;

export const Li = styled.li`
  list-style: disc;
`;
