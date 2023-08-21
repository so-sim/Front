import styled from '@emotion/styled';
import React from 'react';

const DetailListCheckBox = React.forwardRef<HTMLInputElement>(({ ...props }, ref) => {
  return (
    <CheckBoxWrapper>
      <CheckBox type="checkbox" {...props} ref={ref} />
    </CheckBoxWrapper>
  );
});

export default DetailListCheckBox;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;

  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const CheckBox = styled.input`
  appearance: none;

  width: 16px;
  height: 16px;
  box-sizing: border-box;

  border: 1px solid ${({ theme }) => theme.colors.secondary_400};

  background-color: ${({ theme }) => theme.colors.white};

  margin: 0;

  &:focus {
    /* background-color: ${({ theme }) => theme.colors.neutral_200_b}; */
  }

  &:checked {
    /* background: center; */
    /* background-image: url('/check.svg'); */
    /* background-repeat: no-repeat; */
    background-color: ${({ theme }) => theme.colors.primary_500};

    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 4px;

      border-bottom: 2px solid white;
      border-left: 2px solid white;

      transform: translate(-50%, -70%) rotate(-45deg);
    }
  }

  &:disabled {
    border: 2px solid ${({ theme }) => theme.colors.secondary_400};

    background-color: ${({ theme }) => theme.colors.secondary_200};
  }
`;
