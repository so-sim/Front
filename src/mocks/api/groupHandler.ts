import { rest } from 'msw';
import { BASE_URL } from '@/api';
import { GROUP_LIST } from '../data/groupData';
import { getSearchParams } from '../utils/getSearchParams';

let groupList = GROUP_LIST;

const getGroupList = () => {
  return rest.get(BASE_URL + '/api/groups', async (req, res, ctx) => {
    const page = getSearchParams(req, 'page');

    return res(
      ctx.status(200),
      ctx.json({
        status: {
          code: 200,
          message: 'success',
        },
        content: {
          hasNext: false,
          groupList,
        },
      }),
    );
  });
};

const getGroupDetail = (isAdmin = true, isInto = true) => {
  return rest.get(BASE_URL + '/api/group/:groupId', (req, res, ctx) => {
    const { groupId } = req.params;

    const group = groupList.find((group) => group.groupId === Number(groupId));

    return res(
      ctx.status(200),
      ctx.json({
        status: {
          code: 200,
          message: '모임이 성공적으로 조회되었습니다.',
        },
        content: {
          ...group,
          isAdmin,
          isInto,
          size: 2,
        },
      }),
    );
  });
};

const getGroupParticipant = () => {
  return rest.get(BASE_URL + '/api/group/:groupId/participants', (req, res, ctx) => {
    return res(
      ctx.json({
        status: {
          code: 200,
          message: '모임 참가자 리스트가 정상적으로 조회되었습니다.',
        },
        content: {
          adminNickname: '윤하나둘셋넷',
          nicknameList: ['윤하나', '윤둘', '윤셋', '윤넷', '윤하나둘', '윤하나셋넷'],
        },
      }),
    );
  });
};

const createGroup = () => {
  return rest.post(BASE_URL + '/api/group', async (req, res, ctx) => {
    const body = await req.json();

    const groupId = groupList.length;
    const group = {
      ...body,
      adminNickname: body.nickname,
      groupId,
    };

    groupList.unshift(group);
    return res(
      ctx.status(201),
      ctx.json({
        status: {
          code: 900,
          message: '모임이 성공적으로 생성되었습니다.',
        },
        content: {
          group_id: groupId,
        },
      }),
    );
  });
};

const modifyGroup = () => {
  return rest.patch(BASE_URL + '/api/group/:groupId', async (req, res, ctx) => {
    const { groupId } = req.params;
    const body = await req.json();

    let group = groupList.find((group) => group.groupId === Number(groupId));

    group = {
      ...body,
    };

    return res(
      ctx.status(201),
      ctx.json({
        status: {
          code: 200,
          message: '모임이 성공적으로 수정되었습니다.',
        },
        content: { groupId: Number(groupId) },
      }),
    );
  });
};

const deleteGroup = () => {
  return rest.delete(BASE_URL + '/api/group/:groupId', (req, res, ctx) => {
    const { groupId } = req.params;

    groupList = groupList.filter((group) => group.groupId !== Number(groupId));

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
  });
};

const getMyNikckname = () => {
  return rest.get('/api/group/:groupId/participant', (req, res, ctx) => {
    const { groupId } = req.params;

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
  });
};

export const groupHandler = [
  getGroupDetail(), //
  createGroup(),
  getGroupList(),
  getGroupParticipant(),
  modifyGroup(),
  deleteGroup(),
  getMyNikckname(),
];
