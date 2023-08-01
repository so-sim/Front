import React, { createContext, useContext } from 'react';

type TabValue = { value: string; label: string };

type TabElementProps = TabValue;

type TabContainerProps = {
  children: React.ReactNode;
  onChange: (value: string) => void;
};

const TabContext = createContext<{ onChange: (value: string) => void } | null>(null);

const Container = ({ children, onChange }: TabContainerProps) => {
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
