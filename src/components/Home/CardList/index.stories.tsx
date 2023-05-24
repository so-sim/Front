import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CardList } from '.';
import { handler } from '@/mocks/handler';
import { getGroupList } from '@/mocks/api/groupHandler';
import { rest } from 'msw';

export default {
  title: 'Component/Card/CardList',
  component: CardList,
} as ComponentMeta<typeof CardList>;

const Template: ComponentStory<typeof CardList> = (arg) => <CardList />;

export const CardListComponent = Template.bind({});

CardListComponent.parameters = {
  msw: handler,
};
