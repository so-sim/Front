import { ComponentStory, ComponentMeta } from '@storybook/react';
import FineBookUpdateModal from '../FineBookUpdateModal';

export default {
  title: 'Component/Modal/FineBookModal',
  component: FineBookUpdateModal,
} as ComponentMeta<typeof FineBookUpdateModal>;

const Template: ComponentStory<typeof FineBookUpdateModal> = (args) => <FineBookUpdateModal {...args} />;

export const Update = Template.bind({});

Update.args = {
  modalHandler: () => {},
  select: {
    nickname: '종현팔',
    amount: 12_000,
    situation: '미납',
    date: '2023.06.04',
    ground: '지각',
    memo: '걍늦음',
    eventId: 12,
  },
  setSelect: () => {},
};
