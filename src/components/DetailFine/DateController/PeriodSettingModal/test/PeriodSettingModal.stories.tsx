import { ComponentStory, ComponentMeta } from '@storybook/react';
import PeriodSettingModal from '..';

export default {
  title: 'Component/PeriodSettingModal',
  component: PeriodSettingModal,
} as ComponentMeta<typeof PeriodSettingModal>;

const Template: ComponentStory<typeof PeriodSettingModal> = (args) => <PeriodSettingModal {...args} />;

export const Default = Template.bind({});
