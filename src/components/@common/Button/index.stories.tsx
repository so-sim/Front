import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '.';
import { SYSTEM } from '@/assets/icons/System';

export default {
  title: 'Component/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimaryButton = Template.bind({});

PrimaryButton.args = {
  children: 'Button',
  leftIcon: SYSTEM.LINK,
  width: '100px',
};

export const WhiteButton = Template.bind({});

WhiteButton.args = {
  children: 'Button',
  width: '100px',
  color: 'white',
};

export const BlackButton = Template.bind({});

BlackButton.args = {
  children: 'Button',
  width: '100px',
  color: 'black',
};
