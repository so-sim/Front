import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InviteModal from '..';

export default {
  title: 'Component/Modal/InviteModal',
  component: InviteModal,
} as ComponentMeta<typeof InviteModal>;

const Template: ComponentStory<typeof InviteModal> = (args) => <InviteModal {...args} />;

export const Default = Template.bind({});

Default.args = {
  onClick: () => undefined,
};
