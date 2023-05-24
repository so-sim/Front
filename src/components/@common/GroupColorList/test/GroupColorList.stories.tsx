import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GroupColorList } from '..';

export default {
  title: 'Component/GroupColorList',
  component: GroupColorList,
} as ComponentMeta<typeof GroupColorList>;

const Template: ComponentStory<typeof GroupColorList> = (args) => <GroupColorList {...args} />;

export const GroupColorListComponent = Template.bind({});

GroupColorListComponent.args = {
  selectedColor: '#658ef8',
  onChange: () => {},
};
