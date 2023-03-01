import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddCard } from '.';
import { withRouter } from '../../../../../utils/withRouter';
export default {
  title: 'Component/Card/AddCard',
  component: AddCard,
  decorators: [(Story) => withRouter(<Story />)],
} as ComponentMeta<typeof AddCard>;

const Template: ComponentStory<typeof AddCard> = (arg) => <AddCard {...arg} />;

export const AddCardComponent = Template.bind({});

AddCardComponent.args = {};
