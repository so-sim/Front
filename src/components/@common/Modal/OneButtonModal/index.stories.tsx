import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OneButtonModal } from '.';

export default {
  title: 'Component/Modal/OneButtonModal',
  component: OneButtonModal,
} as ComponentMeta<typeof OneButtonModal>;

const Template: ComponentStory<typeof OneButtonModal> = (args) => <OneButtonModal {...args} />;

export const OneButtonModalTemplate = Template.bind({});

OneButtonModalTemplate.args = {
  modalHandler: () => {},
  title: '제목임다',
  description: '설명설명설명설명설명설명설명설명설명설명\n설명설명설명설명설명설명설명설명설명설명',
  confirm: { text: '확인', onClick: () => {} },
};
