import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AdminModal } from '.';
import { withRouter } from '@/utils/withRouter';

export default {
  title: 'Component/Modal/AdminModal',
  component: AdminModal,
  decorators: [(Story) => withRouter(<Story />)],
} as ComponentMeta<typeof AdminModal>;

const Template: ComponentStory<typeof AdminModal> = (args) => <AdminModal {...args} />;

export const AdminModalComponent = Template.bind({});
AdminModalComponent.args = {
  isOpen: true,
  setIsOpen: () => undefined,
};
