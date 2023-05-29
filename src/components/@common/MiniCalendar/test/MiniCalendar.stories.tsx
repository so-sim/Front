import { ComponentStory, ComponentMeta } from '@storybook/react';
import MiniCalendar from '..';

export default {
  title: 'Component/MiniCalendar',
  component: MiniCalendar,
} as ComponentMeta<typeof MiniCalendar>;

const Template: ComponentStory<typeof MiniCalendar> = (args) => <MiniCalendar {...args} />;

export const Default = Template.bind({});

Default.args = {
  type: '2023.05.01',
};
