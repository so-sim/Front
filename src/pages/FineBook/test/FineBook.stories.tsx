import { BASE_URL } from '@/api';
import { handler } from '@/mocks/handler';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import FineBook from '..';

export default {
  title: 'Component/FineBook',
  component: FineBook,
} as ComponentMeta<typeof FineBook>;

const Template: ComponentStory<typeof FineBook> = (args) => <FineBook />;

export const Default = Template.bind({});
Default.parameters = {
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#FFFFFF',
      },
    ],
  },
};

export const Admin = Template.bind({});
Admin.parameters = {
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#FFFFFF',
      },
    ],
  },
  msw: {
    handlers: [
      rest.get(BASE_URL + '/api/group/:groupId', (req, res, ctx) => {
        const groupId = req.url.searchParams.get('groupId');

        return res(
          ctx.status(200),
          ctx.json({
            status: {
              code: 200,
              message: '모임이 성공적으로 조회되었습니다.',
            },
            content: {
              title: '전국 노래 자랑',
              adminNickname: '윤하나둘셋넷',
              coverColor: '#f86565',
              type: '학교, 교내/외 모임',
              isAdmin: true,
              isInto: true,
              groupId,
              size: 2,
            },
          }),
        );
      }),
      ...handler,
    ],
  },
};
