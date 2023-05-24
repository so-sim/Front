import { ComponentStory, ComponentMeta } from '@storybook/react';
import DetailFine from '../index';
import { handler } from '@/mocks/handler';

export default {
  title: 'Component/DetailFine',
  component: DetailFine,
} as ComponentMeta<typeof DetailFine>;

const Template: ComponentStory<typeof DetailFine> = (arg) => <DetailFine />;

export const DetailFineComponent = Template.bind({});

DetailFineComponent.parameters = {
  msw: handler,
};
