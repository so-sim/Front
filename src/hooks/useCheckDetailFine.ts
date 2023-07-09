import { useState } from 'react';
import { EventInfoTest, SelectedEventInfo } from '@/types/event';

export type SelectedEventInfo_Checked = SelectedEventInfo & { checked: boolean };

export type CheckDetailFine = {
  [key: string]: SelectedEventInfo_Checked;
};

export type SetCheckDetailFine = { setAddCheckDetailFine: (detail: SelectedEventInfo) => void; setSubtractCheckDetailFine: (detail: SelectedEventInfo) => void };

const useCheckDetailFine = () => {
  const [checkDetailFine, setCheckDetailFine] = useState<CheckDetailFine>({});

  const setSubtractCheckDetailFine = (detail: SelectedEventInfo) => {
    setCheckDetailFine((prev) => {
      const { [String(detail.eventId)]: removeId, ...rest } = prev;

      return rest;
    });
  };

  const setAddCheckDetailFine = (detail: SelectedEventInfo) => {
    setCheckDetailFine((prev) => ({
      ...prev,
      [detail.eventId]: { ...detail, checked: true },
    }));
  };

  return { checkDetailFine, setCheckDetailFine: { setSubtractCheckDetailFine, setAddCheckDetailFine } };
};

export default useCheckDetailFine;
