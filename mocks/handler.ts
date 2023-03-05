import { BASE_URL } from './../api/index';
import { rest } from 'msw';

const getGroupList: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
      { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
      { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
      { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
      { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
      { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
      { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
      { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
      { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
    ]),
  );
};

const getGroupDetail: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        message: '모임이 성공적으로 조회되었습니다.',
        content: {
          title: '전국 노래 자랑',
          adminNickname: '윤하나둘셋넷',
          createDate: '',
          updateDate: '',
          coverColor: '#f86565',
          groupType: '학교, 교내/외 모임',
        },
      },
    ]),
  );
};

export const handler = [
  rest.get('/api/groupList', getGroupList), //
  rest.get('/api/group/1', getGroupDetail), //
];
