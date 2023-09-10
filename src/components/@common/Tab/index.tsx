import React, { createContext, useContext } from 'react';

type TabValue = { value: string; label: string };

type TabElementProps = TabValue;

type TabContainerProps<T = string> = {
  children: React.ReactNode;
  onChange: (value: T) => void;
};
//Todo: any 제거
const TabContext = createContext<{ onChange: (value: any) => void } | null>(null);

const Container = <T,>({ children, onChange }: TabContainerProps<T>) => {
  return (
    <TabContext.Provider value={{ onChange }}>
      <ul>{children}</ul>
    </TabContext.Provider>
  );
};

const Element = ({ label, value }: TabElementProps) => {
  const context = useContext(TabContext);

  const onClickElement = () => {
    context?.onChange(value);
  };

  return <li onClick={onClickElement}>{label}</li>;
};

export const Tab = {
  Container,
  Element,
};
