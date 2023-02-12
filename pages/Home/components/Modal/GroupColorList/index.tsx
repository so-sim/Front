import styled from '@emotion/styled';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { FormData, GroupColor } from '../CreateGroupModal';
import * as Style from './style';

interface GroupColorList<T, K extends keyof T> {
  value: T;
  type: K;
  onChange: (value: T) => void;
}

export const GroupColorList = <T, K extends keyof T>({ value, onChange, type }: GroupColorList<T, K>) => {
  const colors: GroupColor[] = ['red', 'orange', 'yellow', 'blue', 'purple'];

  const onChangeData = (color: string) => {
    onChange({ ...value, color });
  };

  return (
    <Style.GroupColorList onClick={(e) => e.preventDefault()}>
      {colors.map((color) => {
        return (
          <Style.SelectedButton select={value[type] === color} key={color}>
            <Style.ColorButton color={color} onClick={() => onChangeData(color)} />
          </Style.SelectedButton>
        );
      })}
    </Style.GroupColorList>
  );
};
