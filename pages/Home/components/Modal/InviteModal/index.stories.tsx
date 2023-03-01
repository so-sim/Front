import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InviteModal } from '.';
import { withRouter } from '../../../../../utils/withRouter';

export default {
  title: 'Component/Modal/InviteModal',
  component: InviteModal,
  decorators: [(Story) => withRouter(<Story />)],
} as ComponentMeta<typeof InviteModal>;

const Template: ComponentStory<typeof InviteModal> = (args) => <InviteModal {...args} />;

export const InviteModalComponent = Template.bind({});

InviteModalComponent.args = {
  isOpen: true,
  onClick: () => undefined,
};
