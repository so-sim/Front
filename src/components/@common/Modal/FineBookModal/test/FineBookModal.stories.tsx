import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FineBookModal } from '..';

export default {
  title: 'Component/Modal/FineBookModal',
  component: FineBookModal,
} as ComponentMeta<typeof FineBookModal>;

const Template: ComponentStory<typeof FineBookModal> = (args) => <FineBookModal {...args} />;

/**
 * eventId 유무에 따라 update | create
 */
export const CreateFineBookModal = Template.bind({});

CreateFineBookModal.args = {};

export const UpdateFineBookModal = Template.bind({});

UpdateFineBookModal.args = {
  eventId: 13,
};
