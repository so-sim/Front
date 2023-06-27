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
};
