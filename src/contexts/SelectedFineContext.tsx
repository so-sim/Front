import { SelectedEventInfo } from '@/types/event';
import dayjs from 'dayjs';
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type SelectedFineState = {
  selectedFine: SelectedEventInfo;
  setSelectedFine: Dispatch<SetStateAction<SelectedEventInfo>>;
};

const SelectedFineContext = createContext<SelectedFineState | null>(null);

export const initialSelectData: SelectedEventInfo = {
  eventId: 0,
  memo: '',
  date: dayjs().format('YYYY-MM-DD'),
  situation: '미납',
  nickname: '',
  amount: 0,
  ground: '지각',
};

export function useSelectedContext(componentName: string) {
  const context = useContext(SelectedFineContext);
  if (!context) {
    throw new Error(`<${componentName} /> is missing a parent <ReplyListContextProvider /> component.`);
  }
  return context;
}

const SelectedFineContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedFine, setSelectedFine] = useState<SelectedEventInfo>(initialSelectData);

  return <SelectedFineContext.Provider value={{ selectedFine, setSelectedFine }}>{children}</SelectedFineContext.Provider>;
};

export default SelectedFineContextProvider;
