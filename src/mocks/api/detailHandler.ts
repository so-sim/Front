import { BASE_URL } from '@/api';
import { rest } from 'msw';

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

const details: EventInfo[] = [
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

//서버 코드 변경되면 적용 예정
const getDetailList: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  // console.log(req.url.searchParams.get('year'));
  // console.log(req.url.searchParams.get('month'));
  // console.log(req.url.searchParams.get('day'));

  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '상세 내역 목록이 성공적으로 조회되었습니다.',
      },
      content: {
        list: details,
        total: 19,
      },
    }),
  );
};

const updateDetailStatus: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '납부 여부가 성공적으로 변경되었습니다.',
      },
      content: details[1],
    }),
  );
};

const deleteDetailStatus: Parameters<typeof rest.put>[1] = async (req, res, ctx) => {
  const { eventId } = req.params;

  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '납부 여부가 성공적으로 변경되었습니다.',
      },
      content: details[1],
    }),
  );
};

export const detailHandler = [
  createDetail(),
  getDetail(),
  rest.get(BASE_URL + '/api/event/penalty/list/:groupId', getDetailList),
  rest.post(BASE_URL + '/api/event/penalty/:eventId', updateDetailStatus),
  rest.put(BASE_URL + '/api/event/penalty/:eventId', deleteDetailStatus),
];
