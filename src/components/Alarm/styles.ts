import styled from '@emotion/styled';

export const AlarmIconWrapper = styled.div`
  position: relative;
  &::after {
    content: '99+';

    position: absolute;
    padding: 2px 9px;
    background-color: red;
    color: white;
    border-radius: 1.25rem;
    top: -50%;
    left: 25%;
  }
`;
