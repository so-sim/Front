import { BASE_URL } from '@/api';
import { PathParams, rest, RestRequest } from 'msw';
import dayjs from 'dayjs';

/**
 * 상세 내역 생성시 데이터
 * groupId: number
 * "nickname" : String-"${팀원이름}"
 * "date" : String-"${사유 발생 날짜}" 23.06.01
 * "amount" : int-"${금액}" 1000
 * "ground" : String-"${사유}" 지각 | 결석 | 과제 안 함 | 기타
 * "memo" : String-"${메모}" 밥먹다 지각
 * "situation" : String-"${납부 여부}" 미납, 완납, 확인중
 */

const getSearchParams = (req: RestRequest<never, PathParams<string>>, param: string) => {
  return req.url.searchParams.get(param);
};

type Ground = '지각' | '결석' | '과제 안 함' | '기타';
type Situation = '미납' | '완납' | '확인중';

type EventInfo = {
  eventId: number;
  groupId: number;
  nickname: string;
  date: string;
  amount: number;
  ground: Ground;
  memo: string;
  situation: Situation;
};

let details: EventInfo[] = [
  { eventId: 1, groupId: 1, nickname: '종현', date: '2023.06.25', amount: 10_000, ground: '지각', memo: '', situation: '미납' },
  { eventId: 2, groupId: 1, nickname: '정민', date: '2023.06.30', amount: 10_000, ground: '결석', memo: '', situation: '완납' },
  { eventId: 3, groupId: 1, nickname: '윤하나', date: '2023.07.01', amount: 10_000, ground: '지각', memo: '', situation: '미납' },
  { eventId: 4, groupId: 1, nickname: '가람', date: '2023.06.25', amount: 10_000, ground: '과제 안 함', memo: '', situation: '확인중' },
  { eventId: 5, groupId: 1, nickname: '나경', date: '2023.07.04', amount: 10_000, ground: '지각', memo: '', situation: '확인중' },
  { eventId: 6, groupId: 1, nickname: '현교', date: '2023.07.04', amount: 10_000, ground: '지각', memo: '', situation: '미납' },
  { eventId: 7, groupId: 1, nickname: '재민', date: '2023.07.04', amount: 10_000, ground: '지각', memo: '', situation: '완납' },
];

const createDetail = () => {
  return rest.post(BASE_URL + '/api/event/penalty', async (req, res, ctx) => {
    const newDetail = await req.json();
    const eventId = details.length;
    details.push({ ...newDetail, eventId });

    return res(
      ctx.status(200),
      ctx.json({
        status: {
          code: 900,
          message: '상세 내역이 성공적으로 생성되었습니다.',
        },
        content: {
          eventId,
        },
      }),
    );
  });
};

const getDetail = () => {
  return rest.get(BASE_URL + '/api/event/penalty/:eventId', async (req, res, ctx) => {
    const { eventId } = req.params;

    const detail = details.find((detail) => detail.eventId === Number(eventId));
    return res(
      ctx.status(200),
      ctx.json({
        status: {
          code: 900,
          message: '상세 내역이 성공적으로 조회되었습니다.',
        },
        content: {
          ...detail,
        },
      }),
    );
  });
};

const getDetailList = () => {
  return rest.get(BASE_URL + '/api/event/penalty/list/:groupId', (req, res, ctx) => {
    const { groupId } = req.params;

    const page = getSearchParams(req, 'page');
    const size = getSearchParams(req, 'size');
    const startDate = getSearchParams(req, 'startDate');
    const endDate = getSearchParams(req, 'endDate');

    const startIndex = Number(page) * Number(size);

    const filteredDetails = details.filter((detail) => {
      if (
        Number(groupId) === detail.groupId &&
        dayjs(detail.date).isAfter(dayjs(startDate as string)) &&
        dayjs(detail.date).isBefore(dayjs(endDate as string)) &&
        req.params.nickname &&
        req.params.situation &&
        req.params.nickname === detail.nickname &&
        req.params.situation === detail.situation
      ) {
        return true;
      }
      return false;
    });

    return res(
      ctx.status(200),
      ctx.json({
        status: {
          code: 200,
          message: '상세 내역 목록이 성공적으로 조회되었습니다.',
        },
        content: {
          totlaCount: filteredDetails.length,
          eventList: filteredDetails.slice(startIndex, startIndex + Number(size)),
        },
      }),
    );
  });
};

const updateDetailListStatus = () => {
  return rest.patch(BASE_URL + '/api/event/penalty', async (req, res, ctx) => {
    const { eventId } = req.params;

    const { eventIdList, situation } = await req.json();

    details = details.map((detail) => {
      if (eventIdList.includes(detail.eventId)) {
        return { ...detail, situation };
      }
      return detail;
    });

    return res(
      ctx.status(200),
      ctx.json({
        status: {
          code: 900,
          message: '상세 내역 목록이 성공적으로 조회되었습니다.',
        },
        content: eventIdList,
      }),
    );
  });
};

const updateDetail = () => {
  return rest.patch(BASE_URL + '/api/event/penalty/:eventId', async (req, res, ctx) => {
    const updatedDetail = await req.json();
    const { eventId } = req.params;
    let detail = details.find((detail) => detail.eventId === Number(eventId));
    detail = updatedDetail;

    return res(
      ctx.status(200),
      ctx.json({
        status: {
          code: 900,
          message: '상세 내역이 성공적으로 생성되었습니다.',
        },
        content: {
          eventId,
        },
      }),
    );
  });
};

const deleteDetail = () => {
  return rest.delete(BASE_URL + '/api/event/penalty/:eventId', async (req, res, ctx) => {
    const { eventId } = req.params;

    details = details.filter((detail) => detail.eventId === Number(eventId));

    return res(
      ctx.status(200),
      ctx.json({
        status: {
          code: 900,
          message: '상세 내역이 성공적으로 삭제되었습니다.',
        },
        content: null,
      }),
    );
  });
};

const getCalendarStatus = () => {
  return rest.get(BASE_URL + '/api/event/penalty/calendar', async (req, res, ctx) => {
    const groupId = getSearchParams(req, 'groupId');
    const startDate = getSearchParams(req, 'startDate');
    const endDate = getSearchParams(req, 'endDate');

    const filteredDetails = details.filter((detail) => {
      if (
        Number(groupId) === detail.groupId && //
        dayjs(detail.date).isAfter(dayjs(startDate as string)) &&
        dayjs(detail.date).isBefore(dayjs(endDate as string))
      ) {
        return true;
      }
      return false;
    });

    const statusOfDay = filteredDetails.reduce((accr: { [date: string]: { 미납: number; 완납: number; 확인중: number } }, curr) => {
      const date = dayjs(curr.date).date();
      const statusOfDay = accr[date] ?? { 미납: 0, 완납: 0, 확인중: 0 };
      statusOfDay[curr.situation]++;

      return { ...accr, [date]: statusOfDay };
    }, {});

    return res(
      ctx.status(200),
      ctx.json({
        status: {
          code: 900,
          message: '상세 내역 캘린더가 성공적으로 조회되었습니다.',
        },
        content: { statusOfDay },
      }),
    );
  });
};

export const detailHandler = [
  createDetail(), //
  getDetail(),
  getDetailList(),
  updateDetailListStatus(),
  updateDetail(),
  deleteDetail(),
  getCalendarStatus(),
];
