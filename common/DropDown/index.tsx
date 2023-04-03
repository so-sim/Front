import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import * as Style from './styles';

export interface DropDownProps<T = string> {
  list: {
    title: T;
    svg?: EmotionJSX.Element;
  }[];
  top: string;
  width?: number;
  onClose: () => void;
  setState?: Dispatch<SetStateAction<T>>;
  align?: 'center' | 'start';
  direction?: 'left' | 'right';
}

const DropDown = <T,>({ list, width = 112, align = 'start', setState, onClose, top, direction = 'left' }: DropDownProps<T>) => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleState = (title: T) => {
    if (!setState) return null;
    setState(title);
    onClose();
  };

  const hasSvg = (svg: EmotionJSX.Element | undefined) => {
    return svg === undefined ? false : true;
  };

  useEffect(() => {
    const onClickOutSide = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', onClickOutSide);
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  }, []);

  return (
    <Style.DorpDownContainer onClick={onClose} top={top} ref={dropDownRef} direction={direction}>
      {list.map((item) => {
        if (typeof item.title != 'string') return;
        return (
          <Style.DropDownItem align={align} width={width} hasSvg={hasSvg(item.svg)} key={item.title} onClick={() => handleState(item.title)}>
            {item.svg && <div>{item.svg}</div>}
            <span>{item.title}</span>
          </Style.DropDownItem>
        );
      })}
    </Style.DorpDownContainer>
  );
};

export default DropDown;
