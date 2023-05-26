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
  title: '납부여부 변경',
  description: '납부여부를 변경하시겠습니까?',
  cancel: { text: '취소', onClick: () => {} },
  confirm: { text: '확인', onClick: () => {} },
  flexDirection: 'row',
};

export const ConfirmModalTemplateOneButton = Template.bind({});

ConfirmModalTemplateOneButton.args = {
  modalHandler: () => {},
  title: '납부여부 변경',
  description: '납부여부를 변경하시겠습니까?',
  confirm: { text: '확인', onClick: () => {} },
  flexDirection: 'row',
};
