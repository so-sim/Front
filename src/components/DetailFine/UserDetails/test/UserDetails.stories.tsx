import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserDetails from '..';

export default {
  title: 'Component/UserDetails',
  component: UserDetails,
} as ComponentMeta<typeof UserDetails>;

const Template: ComponentStory<typeof UserDetails> = (args) => <UserDetails {...args} />;

export const Default = Template.bind({});

Default.args = {
  select: {
    eventId: 12,
    userId: 12,
    userName: 'JONHYUN',
    payment: 123_000,
    groundsDate: '2023.05.01',
    grounds: '사유없음',
    paymentType: 'non',
  },
};
