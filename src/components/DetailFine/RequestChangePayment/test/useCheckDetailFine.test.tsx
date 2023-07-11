import { subtractCheckDetailFine, CheckDetailFine, addCheckDetailFine } from '../hooks/useCheckDetailFine';
import { EventInfoTest, SelectedEventInfo } from '@/types/event';

describe('useCheckDetailFine', () => {
  describe('subtractCheckDetailFine', () => {
    const detail: SelectedEventInfo = { amount: 3213, date: '2023.06.26', eventId: 102, ground: '지각', memo: '', nickname: '정민입장', situation: '미납' };
    const prev: CheckDetailFine = {
      100: {
        amount: 3213,
        checked: true,
        date: '2023.06.26',
        eventId: 100,
        ground: '지각',
        memo: '',
        nickname: '정민입장',
        situation: '미납',
      },
      101: {
        amount: 3456,
        checked: true,
        date: '2023.06.26',
        eventId: 101,
        ground: '지각',
        memo: '',
        nickname: '정민입장',
        situation: '미납',
      },
      102: {
        amount: 3456,
        checked: true,
        date: '2023.06.26',
        eventId: 102,
        ground: '지각',
        memo: '',
        nickname: '정민입장',
        situation: '미납',
      },
      103: {
        amount: 3456,
        checked: true,
        date: '2023.06.26',
        eventId: 103,
        ground: '지각',
        memo: '',
        nickname: '정민입장',
        situation: '미납',
      },
    };

    it('인자로 들어오는 detail의 eventId의 매치되는 prev key는 제거되어야한다. ', () => {
      const checkDetailFine = subtractCheckDetailFine(detail, prev);

      expect(Object.keys(checkDetailFine).length).toBe(3);
      expect(Object.keys(checkDetailFine).includes(String(102))).toBe(false);
    });
  });

  describe('addCheckDetailFine', () => {
    const detail: SelectedEventInfo = { amount: 3213, date: '2023.06.26', eventId: 104, ground: '지각', memo: '', nickname: '정민입장', situation: '미납' };
    const prev: CheckDetailFine = {
      100: {
        amount: 3213,
        checked: true,
        date: '2023.06.26',
        eventId: 100,
        ground: '지각',
        memo: '',
        nickname: '정민입장',
        situation: '미납',
      },
      101: {
        amount: 3456,
        checked: true,
        date: '2023.06.26',
        eventId: 101,
        ground: '지각',
        memo: '',
        nickname: '정민입장',
        situation: '미납',
      },
      102: {
        amount: 3456,
        checked: true,
        date: '2023.06.26',
        eventId: 102,
        ground: '지각',
        memo: '',
        nickname: '정민입장',
        situation: '미납',
      },
      103: {
        amount: 3456,
        checked: true,
        date: '2023.06.26',
        eventId: 103,
        ground: '지각',
        memo: '',
        nickname: '정민입장',
        situation: '미납',
      },
    };

    it('detail이 추가되면 길이도 추가가 되며, 기존 detail 내용도 보존이 되어야한다. ', () => {
      const checkDetailFine: CheckDetailFine = addCheckDetailFine(detail, prev);

      expect(Object.keys(checkDetailFine).includes(String(detail.eventId))).toBe(true);
      expect(Object.keys(checkDetailFine).length).toBe(5);
      expect(checkDetailFine[detail.eventId].amount).toBe(detail.amount);
      expect(checkDetailFine[detail.eventId].date).toBe(detail.date);
      expect(checkDetailFine[detail.eventId].ground).toBe(detail.ground);
      expect(checkDetailFine[detail.eventId].nickname).toBe(detail.nickname);
      expect(checkDetailFine[detail.eventId].situation).toBe(detail.situation);
    });

    it('추가된 프로퍼티는 checked 프로퍼티가 true로 추가되어야한다.', () => {
      const checkDetailFine: CheckDetailFine = addCheckDetailFine(detail, prev);

      expect(checkDetailFine[detail.eventId].checked).toBe(true);
    });
  });
});
