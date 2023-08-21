import styled from '@emotion/styled';

export const Frame = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.3;
  height: 100vh;
  width: 100vw;
  z-index: 110;
  background-color: ${({ theme }) => theme.colors.secondary_900};
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;

export const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 340px;
  z-index: 120;
  background-color: ${({ theme }) => theme.colors.secondary_100};
  border-radius: 8px 8px 0 0;
  animation: slidein 0.3s ease-in-out;

  @keyframes slidein {
    from {
      bottom: -340px;
    }
    to {
      bottom: 0;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  ${({ theme }) => theme.font.subhead_03};
`;

export const Body = styled.div`
  padding: 4px 24px 0 24px;
  height: calc(100% - 54px);
  overflow-y: scroll;
`;
