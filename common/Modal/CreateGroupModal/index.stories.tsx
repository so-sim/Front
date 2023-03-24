import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CreateGroupModal } from '.';

export default {
  title: 'Component/Modal/CreateGroupModal',
  component: CreateGroupModal,
} as ComponentMeta<typeof CreateGroupModal>;

const Template: ComponentStory<typeof CreateGroupModal> = (args) => <CreateGroupModal {...args} />;

export const CreateGroupModalComponent = Template.bind({});

CreateGroupModalComponent.args = {
  modalHandler: () => undefined,
};
