import React from 'react';
import { CardList } from '../CardList';
import * as Style from './style';

export const GroupSection = () => {
  return (
    <Style.GroupSection>
      <span>참여 모임</span>
      <CardList />
    </Style.GroupSection>
  );
};
