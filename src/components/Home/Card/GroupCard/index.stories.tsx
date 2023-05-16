import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GroupCard } from '.';

export default {
  title: 'Component/Card/GroupCard',
  component: GroupCard,
} as ComponentMeta<typeof GroupCard>;

const Template: ComponentStory<typeof GroupCard> = (arg) => <GroupCard {...arg} />;

export const GroupCardComponent = Template.bind({});

GroupCardComponent.args = {
  title: '전국 대한 산악회',
  coverColor: '#f86565',
  adminNickname: '하이하이하이염',
};
