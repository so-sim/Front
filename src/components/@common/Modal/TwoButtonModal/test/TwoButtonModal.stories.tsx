import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwoButtonModal } from '..';

export default {
  title: 'Component/Modal/TwoButtonModal',
  component: TwoButtonModal,
} as ComponentMeta<typeof TwoButtonModal>;

const Template: ComponentStory<typeof TwoButtonModal> = (args) => <TwoButtonModal {...args} />;

export const TwoButtonModalTemplate = Template.bind({});

TwoButtonModalTemplate.args = {
  modalHandler: () => {},
  title: '납부여부 변경',
  height: '215px',
  description: '납부여부를 변경하시겠습니까?',
  cancel: { text: '취소', onClick: () => {} },
  confirm: { text: '확인', onClick: () => {} },
  flexDirection: 'row',
};
