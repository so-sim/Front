import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoginModal } from '.';
import { withRouter } from '@/utils/withRouter';

export default {
  title: 'Component/Modal/LoginModal',
  component: LoginModal,
  decorators: [(Story) => withRouter(<Story />)],
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => <LoginModal {...args} />;

export const LoginModalComponent = Template.bind({});

LoginModalComponent.args = {
  isOpen: true,
  setIsOpen: () => undefined,
};
