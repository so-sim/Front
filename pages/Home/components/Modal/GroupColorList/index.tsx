import styled from '@emotion/styled';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { FormData, GroupColor } from '../CreateGroupModal';
import * as Style from './style';

interface GroupColorList {
  value: string;
  onChange: Dispatch<SetStateAction<GroupColor>>;
}

export const GroupColorList = ({ value, onChange }: GroupColorList) => {
  const colors: GroupColor[] = ['red', 'orange', 'yellow', 'blue', 'purple'];

  return (
    <Style.GroupColorList onClick={(e) => e.preventDefault()}>
      {colors.map((color) => {
        return (
          <Style.SelectedButton select={value === color} key={color}>
            <Style.ColorButton color={color} onClick={() => onChange(color)} />
          </Style.SelectedButton>
        );
      })}
    </Style.GroupColorList>
  );
};
