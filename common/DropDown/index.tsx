import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import React, { Dispatch, FC, SetStateAction } from 'react';
import * as Style from './styles';

export interface DropDownProps<T = string> {
  list: {
    title: T;
    svg?: EmotionJSX.Element;
  }[];
  top: string;
  width?: number;
  onClose: () => void;
  setState: Dispatch<SetStateAction<T>>;
}

const DropDown = <T,>({ list, width = 112, setState, onClose, top }: DropDownProps<T>) => {
  const handleState = (title: T) => {
    setState(title);
    onClose();
  };

  const hasSvg = (svg: EmotionJSX.Element | undefined) => {
    return svg === undefined ? false : true;
  };

  return (
    <Style.DorpDownContainer onClick={onClose} top={top}>
      {list.map((item) => {
        if (typeof item.title != 'string') return;
        return (
          <Style.DropDownItem width={width} hasSvg={hasSvg(item.svg)} key={item.title} onClick={() => handleState(item.title)}>
            <div>{item.svg}</div>
            <span>{item.title}</span>
          </Style.DropDownItem>
        );
      })}
    </Style.DorpDownContainer>
  );
};

export default DropDown;
