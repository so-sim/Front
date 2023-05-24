import { GropuList } from '@/types/group';
import { rest } from 'msw';

const groupList: GropuList[] = [
  { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565', groupId: 1, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나', coverColor: '#f86565', groupId: 2, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤둘', coverColor: '#f86565', groupId: 3, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤셋', coverColor: '#f86565', groupId: 4, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤넷', coverColor: '#f86565', groupId: 5, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘', coverColor: '#f86565', groupId: 6, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나셋넷', coverColor: '#f86565', groupId: 7, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤둘셋넷', coverColor: '#f86565', groupId: 8, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘넷', coverColor: '#f86565', groupId: 9, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘넷', coverColor: '#f86565', groupId: 10, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘넷', coverColor: '#f86565', groupId: 11, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘넷', coverColor: '#f86565', groupId: 12, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘넷', coverColor: '#f86565', groupId: 13, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘넷', coverColor: '#f86565', groupId: 14, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘넷', coverColor: '#f86565', groupId: 15, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘넷', coverColor: '#f86565', groupId: 16, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘넷', coverColor: '#f86565', groupId: 17, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘넷', coverColor: '#f86565', groupId: 18, type: '스터디' },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘넷', coverColor: '#f86565', groupId: 19, type: '스터디' },
];

export const getGroupList: Parameters<typeof rest.get>[1] = async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: 'success',
      },
      content: {
        index: 0,
        next: false,
        groupList,
      },
    }),
  );
};

const getGroupDetail: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
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
        createDate: '',
        updateDate: '',
        coverColor: '#f86565',
        type: '학교, 교내/외 모임',
        isAdmin: false,
      },
    }),
  );
};

const getGroupParticipant: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(
    ctx.json({
      status: {
        code: 200,
        message: '모임 참가자 리스트가 정상적으로 조회되었습니다.',
      },
      content: {
        adminId: '125hlkfd',
        adminNickname: '윤하나둘셋넷',
        memberList: [
          { nickname: '윤하나둘셋넷', userId: 0 },
          { nickname: '윤하나', userId: 1 },
          { nickname: '윤둘', userId: 2 },
          { nickname: '윤셋', userId: 3 },
          { nickname: '윤넷', userId: 4 },
          { nickname: '윤하나둘', userId: 5 },
          { nickname: '윤하나셋넷', userId: 6 },
        ],
      },
    }),
  );
};

const createGroup: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {
  const body = await req.json();
  groupList.push(body);
  return res(
    ctx.status(201),
    ctx.json({
      status: {
        code: 200,
        message: '모임이 성공적으로 생성되었습니다.',
      },
      content: {
        group_id: '10',
      },
    }),
  );
};

const modifyGroup: Parameters<typeof rest.put>[1] = (req, res, ctx) => {
  return res(ctx.status(201));
};

const deleteGroup: Parameters<typeof rest.delete>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '모임이 성공적으로 삭제되었습니다.',
      },
      content: null,
    }),
  );
};

const joinGroup: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      status: {
        code: 200,
        message: '모임에 성공적으로 참가되었습니다.',
      },
      content: null,
    }),
  );
};

const changeAdmin: Parameters<typeof rest.patch>[1] = async (req, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      status: {
        code: 200,
        message: '관리자가 성공적으로 변경되었습니다.',
      },
      content: null,
    }),
  );
};

const withdrawalGroup: Parameters<typeof rest.delete>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '성공적으로 모임에서 탈퇴되었습니다.',
      },
      content: null,
    }),
  );
};

const changeNickname: Parameters<typeof rest.patch>[1] = async (req, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      status: {
        code: 200,
        message: '성공적으로 닉네임이 수정되었습니다.',
      },
      content: null,
    }),
  );
};

const getMyNikckname: Parameters<typeof rest.get>[1] = async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '성공적으로 닉네임을 조회했습니다',
      },
      content: {
        nickname: '유저 닉네임',
      },
    }),
  );
};

export const groupHandler = [
  rest.get('https://back.sosim-manager.com/api/groups', getGroupList),
  rest.get('/api/group/1', getGroupDetail),
  rest.get('/api/group/1/participants', getGroupParticipant),
  rest.post('/api/group', createGroup),
  rest.post('/api/group/1/participant', joinGroup),
  rest.put('/api/group/1', modifyGroup),
  rest.patch('/api/group/admin/1', changeAdmin),
  rest.patch('/api/participant/1', changeNickname),
  rest.delete('/api/group/1', deleteGroup),
  rest.delete('/api/group/1', withdrawalGroup),
  rest.get('/api/group/1/participant', getMyNikckname),
];
