import styled from '@emotion/styled';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { FormData, GroupColor } from '../GroupModal';
import * as Style from './style';

interface GroupColorList<T extends GroupColor> {
  colors: T[];
  select: T;
  setSelect: (value: T, type: keyof FormData) => void;
}

export const GroupColorList: FC<GroupColorList<GroupColor>> = ({ colors, select, setSelect }) => {
  return (
    <Style.GroupColorList onClick={(e) => e.preventDefault()}>
      {colors.map((color) => {
        return (
          <Style.SelectedButton select={select === color} key={color}>
            <Style.ColorButton color={color} onClick={() => setSelect(color, 'color')} />
          </Style.SelectedButton>
        );
      })}
    </Style.GroupColorList>
  );
};
