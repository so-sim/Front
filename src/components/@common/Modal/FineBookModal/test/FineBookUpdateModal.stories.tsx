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
    userName: '종현팔',
    payment: 12_000,
    paymentType: 'non',
    groundsDate: '2023.06.04',
    grounds: '걍 늦음',
    userId: 1,
    eventId: 12,
  },
  setSelect: () => {},
};
