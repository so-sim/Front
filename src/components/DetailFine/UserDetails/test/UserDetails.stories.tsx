import { BASE_URL } from '@/api';
import { UserState, userState } from '@/store/userState';
import { RecoilObserver } from '@/tests/recoilObserver';
import { EventInfoTest } from '@/types/event';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import UserDetails from '..';

export default {
  title: 'Component/UserDetails',
  component: UserDetails,
} as ComponentMeta<typeof UserDetails>;

const selectState: Omit<EventInfoTest, 'groupId'> = {
  eventId: 12,
  nickname: 'JONHYUN',
  amount: 123_000,
  date: '2023.05.01',
  memo: '사유없음',
  situation: '미납',
  ground: '지각',
};

const Template: ComponentStory<typeof UserDetails> = (args) => {
  const loggedInUser: UserState = {
    email: 'antoni0922@naver.com',
    userId: 2,
  };
  return (
    <>
      <RecoilObserver onChange={() => {}} node={userState} initValue={loggedInUser} />
      <UserDetails {...args} />
    </>
  );
};
export const Other = Template.bind({});
Other.args = {
  select: selectState,
};

const OwnTemplate: ComponentStory<typeof UserDetails> = (args) => {
  const loggedInUser: UserState = {
    email: 'antoni0922@naver.com',
    userId: 1,
  };
  return (
    <>
      <RecoilObserver onChange={() => {}} node={userState} initValue={loggedInUser} />
      <UserDetails {...args} />
    </>
  );
};
export const Own = OwnTemplate.bind({});
Own.args = {
  select: selectState,
};

const AdminTemplate: ComponentStory<typeof UserDetails> = (args) => {
  const loggedInUser: UserState = {
    email: 'antoni0922@naver.com',
    userId: 1,
  };
  return (
    <>
      <RecoilObserver onChange={() => {}} node={userState} initValue={loggedInUser} />
      <UserDetails {...args} />
    </>
  );
};
export const Admin = AdminTemplate.bind({});
Admin.args = {
  select: selectState,
};

Admin.parameters = {
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
    ],
  },
};
