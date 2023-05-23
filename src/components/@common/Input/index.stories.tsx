import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from '.';

export default {
  title: 'Component/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Error = Template.bind({});

Error.args = {
  value: '',
  maxLength: 15,
  placeholder: '테스트입니다',
  errorText: '오류임둥',
  onChange: () => {},
};

export const Success = Template.bind({});

Success.args = {
  value: '',
  maxLength: 15,
  placeholder: '테스트입니다',
  errorText: '',
  onChange: () => {},
};
