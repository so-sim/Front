import React from 'react';
import { Paragraph } from '../../Paragraph';
import { CardList } from '../CardList';
import * as Style from './style';

export const GroupSection = () => {
  return (
    <Paragraph>
      <Style.GroupSection>
        <Style.Title>참여 모임</Style.Title>
        <CardList />
      </Style.GroupSection>
    </Paragraph>
  );
};
