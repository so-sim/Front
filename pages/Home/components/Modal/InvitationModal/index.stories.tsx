import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InvitationModal } from '.';
import { withRouter } from '../../../../../utils/withRouter';

export default {
  title: 'Component/Modal/InvitationModal',
  component: InvitationModal,
  decorators: [(Story) => withRouter(<Story />)],
} as ComponentMeta<typeof InvitationModal>;

const Template: ComponentStory<typeof InvitationModal> = (args) => <InvitationModal {...args} />;

export const InvitationModalComponent = Template.bind({});

InvitationModalComponent.args = {
  isOpen: true,
  onClick: () => undefined,
};
