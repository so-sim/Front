import styled from '@emotion/styled';
import React from 'react';

const MemberListCheckbox = React.forwardRef<HTMLInputElement, { disabled: boolean; onClick: (event: React.MouseEvent<HTMLInputElement>) => void }>(
  ({ disabled, onClick, ...props }, ref) => {
    return disabled ? (
      <CheckBoxWrapper>
        <CheckBox type="checkbox" disabled={disabled} onClick={onClick} {...props} ref={ref} />
      </CheckBoxWrapper>
    ) : (
      <CheckBoxWrapper {...props} onClick={onClick}>
        <CheckBox type="checkbox" disabled={disabled} {...props} ref={ref} />
      </CheckBoxWrapper>
    );
  },
);

export default MemberListCheckbox;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem 0.5rem 0.25rem;
`;

export const CheckBox = styled.input`
  appearance: none;

  min-width: 16px;
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
