import styled from '@emotion/styled';
import React, { createContext, useContext, PropsWithChildren } from 'react';

type CheckboxContextProps = {
  id: string;
  isChecked: boolean;
  onChange: (event: React.MouseEvent<HTMLInputElement>) => void;
};

type CheckboxProps = CheckboxContextProps & React.PropsWithChildren<{}>;

const CheckboxContext = createContext<CheckboxContextProps>({
  id: '',
  isChecked: false,
  onChange: () => {},
});

const CheckboxContainer = ({ id, isChecked, onChange, children }: CheckboxProps) => {
  const value = {
    id,
    isChecked,
    onChange,
  };

  return <CheckboxContext.Provider value={value}>{children}</CheckboxContext.Provider>;
};
// Context

const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  return context;
};
// useContext hook

const Checkbox = React.forwardRef<HTMLInputElement>(({ ...props }, ref) => {
  const { id, isChecked, onChange } = useCheckboxContext();

  return (
    <>
      <input type="checkbox" id={id} checked={isChecked} onClick={onChange} readOnly ref={ref} {...props} />
    </>
  );
});

const Label = ({ children, ...props }: PropsWithChildren<{}>) => {
  const { id } = useCheckboxContext();
  return (
    <label htmlFor={id} {...props}>
      {children}
    </label>
  );
};

CheckboxContainer.Checkbox = Checkbox;
CheckboxContainer.Label = Label;

export default CheckboxContainer;
