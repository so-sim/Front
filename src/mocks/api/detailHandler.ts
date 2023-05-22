import { BASE_URL } from '@/api';
import { EventInfo } from '@/types/event';
import { rest } from 'msw';

const details: EventInfo[] = [
  { userId: 1, eventId: 1, groundsDate: '2023.07.01', paymentType: 'con', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 2, eventId: 2, groundsDate: '2023.07.04', paymentType: 'non', userName: '윤하나둘셋13', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 3, eventId: 3, groundsDate: '2023.07.15', paymentType: 'full', userName: '윤하나둘셋23', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 4, eventId: 4, groundsDate: '2023.07.08', paymentType: 'con', userName: '윤하나둘셋33', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 5, eventId: 5, groundsDate: '2023.07.29', paymentType: 'full', userName: '윤하나둘셋45', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 6, eventId: 6, groundsDate: '2023.07.22', paymentType: 'non', userName: '윤하나둘셋14', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 7, eventId: 7, groundsDate: '2023.02.22', paymentType: 'con', userName: '윤하나둘셋245', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 8, eventId: 8, groundsDate: '2023.07.04', paymentType: 'con', userName: '윤하나둘셋614', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 9, eventId: 9, groundsDate: '2023.07.15', paymentType: 'full', userName: '윤하나둘셋fdas', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 10, eventId: 10, groundsDate: '2023.07.08', paymentType: 'con', userName: '윤하나둘셋6136', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 11, eventId: 11, groundsDate: '2023.07.29', paymentType: 'full', userName: '윤하나둘셋66', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 12, eventId: 12, groundsDate: '2023.02.22', paymentType: 'con', userName: '윤하나둘셋141', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 13, eventId: 13, groundsDate: '2023.08.04', paymentType: 'non', userName: '윤하나둘셋3214', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 14, eventId: 14, groundsDate: '2023.08.15', paymentType: 'full', userName: '윤하나532둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 15, eventId: 15, groundsDate: '2023.08.08', paymentType: 'con', userName: '윤하나둘1616셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 16, eventId: 16, groundsDate: '2023.08.29', paymentType: 'full', userName: '윤하나둘5124셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 17, eventId: 17, groundsDate: '2023.07.22', paymentType: 'non', userName: '윤하나둘셋g', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 18, eventId: 18, groundsDate: '2023.02.22', paymentType: 'con', userName: '윤하나둘셋1', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 19, eventId: 19, groundsDate: '2023.07.04', paymentType: 'non', userName: '윤하나둘셋6', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 20, eventId: 20, groundsDate: '2023.07.15', paymentType: 'full', userName: '윤하나둘셋b', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 21, eventId: 21, groundsDate: '2023.07.30', paymentType: 'con', userName: '윤하나둘셋e', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: 22, eventId: 22, groundsDate: '2023.07.29', paymentType: 'full', userName: '윤하나둘셋g', payment: 1_000_000, grounds: '밥먹다 지각' },
];

const createDetail: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {
  const detail = await req.json();
  const eventId = details.length;
  details.push({ ...detail, eventId });

  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '상세 내역이 성공적으로 생성되었습니다.',
      },
      content: {
        eventId,
      },
    }),
  );
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
      content: details,
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
  rest.post(BASE_URL + '/api/event/penalty', createDetail),
  rest.get(BASE_URL + '/api/event/penalty/list/:groupId', getDetailList),
  rest.post(BASE_URL + '/api/event/penalty/:eventId', updateDetailStatus),
  rest.put(BASE_URL + '/api/event/penalty/:eventId', deleteDetailStatus),
];
