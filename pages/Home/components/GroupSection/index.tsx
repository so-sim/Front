import React from 'react';
import { CardList } from '../CardList';
import * as Style from './style';

export const GroupSection = () => {
  return (
    <Style.GroupSection>
      <Style.Title>참여 모임</Style.Title>
      <CardList />
    </Style.GroupSection>
  );
};
