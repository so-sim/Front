import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';
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
  openDropDown: boolean;
  setOpenDropDown: Dispatch<SetStateAction<boolean>>;
}

const DropDown = <T,>({ list, width = 112, setState, onClose, top, openDropDown, setOpenDropDown }: DropDownProps<T>) => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleState = (title: T) => {
    setState(title);
    onClose();
  };

  const hasSvg = (svg: EmotionJSX.Element | undefined) => {
    return svg === undefined ? false : true;
  };

  useEffect(() => {
    const onClickOutSide = (e: MouseEvent) => {
      if (openDropDown && dropDownRef.current) {
        setOpenDropDown(false);
      }
    };
    document.addEventListener('mousedown', onClickOutSide);
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  }, []);

  return (
    <Style.DorpDownContainer onClick={onClose} top={top} ref={dropDownRef}>
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
