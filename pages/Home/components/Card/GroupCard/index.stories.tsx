import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GroupCard } from '.';
import { withRouter } from '../../../../../utils/withRouter';
export default {
  title: 'Component/Card/GroupCard',
  component: GroupCard,
  decorators: [(Story) => withRouter(<Story />)],
} as ComponentMeta<typeof GroupCard>;

const Template: ComponentStory<typeof GroupCard> = (arg) => <GroupCard {...arg} />;

export const GroupCardComponent = Template.bind({});

GroupCardComponent.args = {
  title: '전국 대한 산악회',
  color: 'blue',
  admin: '하이하이하이염',
};
