import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropbox from '.';
import { DROPDOWN_LIST } from '@/constants/Group';

export default {
  title: 'Component/Dropbox',
  component: Dropbox,
} as ComponentMeta<typeof Dropbox>;

const Template: ComponentStory<typeof Dropbox> = (args) => <Dropbox {...args} />;

export const DropboxComponent = Template.bind({});

DropboxComponent.args = {
  dropDownList: DROPDOWN_LIST,
};
