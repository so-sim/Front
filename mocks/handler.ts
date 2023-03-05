import { BASE_URL } from './../api/index';
import { rest } from 'msw';

const groupList = [
  { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565' },
];

const getGroupList: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(groupList));
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

const getGroupParticipant: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(ctx.json({ message: '모임 참가자 리스트가 정상적으로 조회되었습니다.', content: {} }));
};

const createGroup: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {
  const body = await req.json();
  groupList.push(body);
  return res(
    ctx.status(201),
    ctx.json({
      message: '모임이 성공적으로 생성되었습니다.',
      content: {
        group_id: 'fdsa',
      },
    }),
  );
};

const modifyGroup: Parameters<typeof rest.put>[1] = (req, res, ctx) => {
  return res(ctx.status(201));
};

const deleteGroup: Parameters<typeof rest.put>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      message: '모임이 성공적으로 삭제되었습니다.',
      content: null,
    }),
  );
};

export const handler = [
  rest.get('/api/groupList', getGroupList), //
  rest.get('/api/group/1', getGroupDetail), //
  rest.get('/api/group/1/participant', getGroupParticipant), //
  rest.post('api/group', createGroup),
  rest.put('api/group/1', modifyGroup),
  rest.delete('api/group/1', deleteGroup),
];
