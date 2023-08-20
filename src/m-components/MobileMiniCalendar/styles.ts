import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(45, 45, 45, 0.3);
  width: 100%;
  height: 100%;
`;

export const Frame = styled.div`
  position: absolute;
  height: fit-content;
  width: 302px;
  margin: auto;
  display: flex;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;
