import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from '.';
import { withRouter } from '@/utils/withRouter';

export default {
  title: 'Component/Header',
  component: Header,
  decorators: [(Story) => withRouter(<Story />)],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const LoggedOut = Template.bind({});
