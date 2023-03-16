import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoginModal } from '.';

export default {
  title: 'Component/Modal/LoginModal',
  component: LoginModal,
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => <LoginModal {...args} />;

export const LoginModalComponent = Template.bind({});

LoginModalComponent.args = {
  isOpen: true,
  modalHandler: () => undefined,
};
