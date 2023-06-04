import { ComponentStory, ComponentMeta } from '@storybook/react';
import FineBookCreateModal from '../FineBookCreateModal';

export default {
  title: 'Component/Modal/FineBookModal',
  component: FineBookCreateModal,
} as ComponentMeta<typeof FineBookCreateModal>;

const Template: ComponentStory<typeof FineBookCreateModal> = (args) => <FineBookCreateModal {...args} />;

export const Create = Template.bind({});

Create.args = {
  modalHandler: () => {},
};
