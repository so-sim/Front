import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CreateGroupModal } from '.';
import { withRouter } from '@/utils/withRouter';

export default {
  title: 'Component/Modal/CreateGroupModal',
  component: CreateGroupModal,
  decorators: [(Story) => withRouter(<Story />)],
} as ComponentMeta<typeof CreateGroupModal>;

const Template: ComponentStory<typeof CreateGroupModal> = (args) => <CreateGroupModal {...args} />;

export const CreateGroupModalComponent = Template.bind({});

CreateGroupModalComponent.args = {
  isOpen: true,
  setIsOpen: () => undefined,
};
