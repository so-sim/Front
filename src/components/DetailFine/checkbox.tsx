import styled from '@emotion/styled';
import React from 'react';

const DetailListCheckBox = React.forwardRef<HTMLInputElement>(({ ...props }, ref) => {
  return <CheckBox type="checkbox" {...props} ref={ref} />;
});

export default DetailListCheckBox;

export const CheckBox = styled.input`
  appearance: none;

  width: 12px;
  height: 12px;

  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};

  border-radius: 0.25rem;

  background-color: ${({ theme }) => theme.colors.white};

  &:focus {
    /* border-color: ${({ theme }) => theme.colors.orange_600}; */
  }

  &:checked {
    border-color: ${({ theme }) => theme.colors.orange_600};

    background: center;
    background-color: ${({ theme }) => theme.colors.orange_200};
    /* background-image: url('/check.svg'); */
    background-repeat: no-repeat;
  }

  &:disabled {
    border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};

    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;
