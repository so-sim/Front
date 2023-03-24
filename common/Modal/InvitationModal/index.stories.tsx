import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InvitationModal } from '.';

export default {
  title: 'Component/Modal/InvitationModal',
  component: InvitationModal,
} as ComponentMeta<typeof InvitationModal>;

const Template: ComponentStory<typeof InvitationModal> = (args) => <InvitationModal {...args} />;

export const InvitationModalComponent = Template.bind({});

InvitationModalComponent.args = {
  onClick: () => undefined,
};
