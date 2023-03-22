import { EvnetInfo } from '@/types/event';
import { rest } from 'msw';

const randomId = () => Math.floor(Math.random() * 1000000);

const details: EvnetInfo[] = [
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-01-22 11:12:30',
    paymentType: '미납',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-02-22 11:12:30',
    paymentType: '확인필요',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-03-22 11:12:30',
    paymentType: '미납',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-01-15 11:12:30',
    paymentType: '완납',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-01-08 11:12:30',
    paymentType: '확인필요',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-01-29 11:12:30',
    paymentType: '완납',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-01-22 11:12:30',
    paymentType: '미납',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-02-22 11:12:30',
    paymentType: '확인필요',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-03-22 11:12:30',
    paymentType: '미납',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-01-15 11:12:30',
    paymentType: '완납',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-01-08 11:12:30',
    paymentType: '확인필요',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-01-29 11:12:30',
    paymentType: '완납',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  {
    userId: randomId(),
    eventId: randomId(),
    groundsDate: '23-01-22 11:12:30',
    paymentType: '미납',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각밥먹다 지각',
  },
  { userId: randomId(), eventId: randomId(), groundsDate: '23-02-22 11:12:30', paymentType: '확인필요', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23-03-22 11:12:30', paymentType: '미납', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23-01-15 11:12:30', paymentType: '완납', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23-01-08 11:12:30', paymentType: '확인필요', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23-01-29 11:12:30', paymentType: '완납', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23-01-22 11:12:30', paymentType: '미납', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23-02-22 11:12:30', paymentType: '확인필요', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23-03-22 11:12:30', paymentType: '미납', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23-01-15 11:12:30', paymentType: '완납', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23-01-08 11:12:30', paymentType: '확인필요', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
  { userId: randomId(), eventId: randomId(), groundsDate: '23-01-29 11:12:30', paymentType: '완납', userName: '윤하나둘셋', payment: 1_000_000, grounds: '밥먹다 지각' },
];

const createDetail: Parameters<typeof rest.post>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      status: {
        code: 200,
        message: '상세 내역이 성공적으로 생성되었습니다.',
      },
      content: {
        eventId: 124123214,
      },
    }),
  );
};

const getDetailList: Parameters<typeof rest.post>[1] = (req, res, ctx) => {
  // console.log(req.url.search);

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

export const detailHandler = [rest.post('/api/event/penalty', createDetail), rest.get('/api/event/penalty?year=2023&month=3', getDetailList)];
