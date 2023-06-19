import { dateStateTest } from '@/store/dateStateTest';
import { RecoilObserver } from '@/tests/recoilObserver';
import { withRouter } from '@/tests/withRouter';
import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import useDateController from '../hook/useDateController';

describe('DateController', () => {
  it('weekToDate', () => {
    let result = {} as ReturnType<typeof useDateController>;
    const Controller = () => {
      result = useDateController();
      return null;
    };

    render(
      withRouter(
        <>
          <Controller />
          <RecoilObserver node={dateStateTest} initValue={{ baseDateTest: dayjs('2023-06-19'), startDate: dayjs('2023-06-19'), endDate: dayjs('2023-06-19') }} />
        </>,
      ),
    );

    expect(result.weekToDate(3)).toBe(11);
  });
});
