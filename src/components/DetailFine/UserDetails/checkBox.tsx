import styled from '@emotion/styled';
import { createContext, useContext, PropsWithChildren } from 'react';

type CheckboxContextProps = {
  id: string;
  isChecked: boolean;
  onChange: () => void;
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

const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  return context;
};

const Checkbox = ({ ...props }) => {
  const { id, isChecked, onChange } = useCheckboxContext();
  return (
    <>
      <input type="checkbox" id={id} checked={isChecked} onChange={onChange} {...props} />
    </>
  );
};

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
