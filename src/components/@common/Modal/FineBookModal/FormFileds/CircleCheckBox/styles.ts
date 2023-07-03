import styled from '@emotion/styled';

export const CheckBoxContainer = styled.div`
  position: relative;
`;

export const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 0.375rem;
`;

export const CheckBox = styled.div<{ checked: boolean }>`
  position: relative;

  border-radius: 9999px;
  padding: 0.5rem;

  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.secondary_400};
  background-color: ${({ theme }) => theme.colors.neutral_200_b};

  &::after {
    content: '';
    position: absolute;
    top: 50;
    left: 50;

    border-radius: 9999px;
    padding: 0.25rem;

    background-color: ${({ checked, theme }) => (checked ? theme.colors.primary_500 : theme.colors.neutral_200_b)};

    transform: translate(-50%, -50%);
  }
`;

export const Text = styled.label`
  ${({ theme }) => theme.font.body_02};
`;
