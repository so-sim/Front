import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthModal } from '..';

export default {
  title: 'Component/Modal/LoginModal',
  component: AuthModal,
} as ComponentMeta<typeof AuthModal>;

const Template: ComponentStory<typeof AuthModal> = (args) => <AuthModal {...args} />;

export const LoginModalComponent = Template.bind({});

LoginModalComponent.args = {
  modalHandler: () => undefined,
};
