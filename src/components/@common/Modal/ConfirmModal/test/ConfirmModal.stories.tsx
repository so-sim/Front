import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConfirmModal } from '..';

export default {
  title: 'Component/Modal/ConfirmModal',
  component: ConfirmModal,
} as ComponentMeta<typeof ConfirmModal>;

const Template: ComponentStory<typeof ConfirmModal> = (args) => <ConfirmModal {...args} />;

export const ConfirmModalTemplate = Template.bind({});

ConfirmModalTemplate.args = {
  modalHandler: () => {},
  cancel: () => {},
  confirm: () => {},
  flexDirection: 'row',
};

export const ConfirmModalTemplateOneButton = Template.bind({});

ConfirmModalTemplateOneButton.args = {
  modalHandler: () => {},
  confirm: () => {},
  flexDirection: 'row',
};
