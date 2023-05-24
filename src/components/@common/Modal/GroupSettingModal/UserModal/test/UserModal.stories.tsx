import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserModal } from '..';

export default {
  title: 'Component/Modal/GroupSetting',
  component: UserModal,
} as ComponentMeta<typeof UserModal>;

const Template: ComponentStory<typeof UserModal> = (args) => <UserModal {...args} />;

export const UserModalComponent = Template.bind({});
UserModalComponent.args = {
  modalHandler: () => undefined,
};
