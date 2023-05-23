import { ComponentStory, ComponentMeta } from '@storybook/react';
import ChangeAdminModal from '.';

export default {
  title: 'Component/Modal/ChangeAdminModal',
  component: ChangeAdminModal,
} as ComponentMeta<typeof ChangeAdminModal>;

const Template: ComponentStory<typeof ChangeAdminModal> = (args) => <ChangeAdminModal {...args} />;

export const ChangeAdminModalComponent = Template.bind({});

ChangeAdminModalComponent.args = {
  modalHandler: () => undefined,
};
