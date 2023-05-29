import { RecoilObserver } from '@/tests/recoilObserver';
import { withRouter } from '@/tests/withRouter';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailFine from '..';
import { dateState } from '@/store/dateState';
import dayjs from 'dayjs';

// 외부 의존성 없는 것이 동작을 테스트하기 편하구나..
// 확실히 컴포넌트는 데이터를 받아서 그려주는 것을 테스트하기 편함
// 단위테스트하는 요소 내부적으로 데이터를 처리해서 넣어주는 것 보다는
// 처리한 데이터를 넣고, 어떻게 그려주는지 판단하는게 단위테스트

// 통합 테스트에서는 어떻게 움직이는지를 테스트하는게 좋음
// 그럼 컴포넌트 하나하나에서 하기보다는 최상위 컴포넌트에서 하는게 좋겠네..
describe('DetailFine', () => {
  const initRecoilDateState = {
    baseDate: dayjs('2023-07-01'),
    selectedDate: null,
    week: null,
  };

  describe('날짜 필터링, 날짜 변경으로 인해 상세 내역에 표시되는 날짜 테스트', () => {
    const onChange = jest.fn();
    let user: any;

    beforeEach(() => {
      user = userEvent.setup();

      render(
        withRouter(
          <>
            <RecoilObserver node={dateState} initValue={initRecoilDateState} onChange={onChange} />
            <DetailFine />
          </>,
          '/group/17/book/detail',
        ),
      );
    });

    it('월간 필터링일 경우 오른쪽 화살표 버튼 클릭 시 다음달로 넘어가야 한다', async () => {
      await user.click(screen.getByText('월간'));
      await user.click(screen.getByTestId('list_skip_right'));
      await user.click(screen.getByTestId('list_skip_right'));

      expect(screen.getByText('09월')).toBeInTheDocument();
    });

    it('월간 필터링일 경우 이전 화살표 버튼 클릭 시 이전달로 넘어가야 한다', async () => {
      await user.click(screen.getByText('월간'));
      await user.click(screen.getByTestId('list_skip_left'));
      await user.click(screen.getByTestId('list_skip_left'));

      expect(screen.getByText('05월')).toBeInTheDocument();
    });

    it('주간 필터링 버튼을 클릭했을 경우 화면에 6주 버튼이 등장해야 한다', async () => {
      await user.click(screen.getByText('주간'));

      expect(screen.getByText('6주')).toBeInTheDocument();
    });

    it('6주차 버튼을 클릭했을 경우 "07월 30일 - 08월 05일"이 표기되어야 한다', async () => {
      await user.click(screen.getByText('주간'));
      await user.click(screen.getByText('6주'));

      expect(screen.getByText('07월 30일 - 08월 05일')).toBeInTheDocument();
    });

    it('주간 버튼 클릭 후 일간 버튼 클릭했을 때 그 주차의 첫번째 날이 표기되어야 한다', async () => {
      await user.click(screen.getByText('주간'));
      await user.click(screen.getByText('3주'));
      await user.click(screen.getByText('일간'));

      expect(screen.getByText('07월 09일')).toBeInTheDocument();
    });

    it('월간 클릭 후 일간 필터링을 클릭했을 경우 "07월 01일"이 표기되어야 한다', async () => {
      await user.click(screen.getByText('월간'));
      await user.click(screen.getByText('일간'));

      expect(screen.getByText('07월 01일')).toBeInTheDocument();
    });

    it('일간 클릭 후 오른쪽 화살표를 두번 클릭하면 "07월 03일"이 표기되어야 한다', async () => {
      await user.click(screen.getByText('일간'));
      await user.click(screen.getByTestId('list_skip_right'));
      await user.click(screen.getByTestId('list_skip_right'));

      expect(screen.getByText('07월 03일')).toBeInTheDocument();
    });

    it('월간 클릭 후 주간 필터링을 클릭했을 때 "06월 25일 - 07월 01일"이 표기되어야 한다 ', async () => {
      await user.click(screen.getByText('월간'));
      await user.click(screen.getByText('주간'));

      expect(screen.getByText('06월 25일 - 07월 01일')).toBeInTheDocument();
    });

    it('1주차 날짜 선택 -> 주간 필터링 -> 일간 필터링으로 변경했을 때 해당 month의 1일이 선택되어야 한다', async () => {
      await user.click(screen.getByText('월간'));
      await user.click(screen.getByTestId('list_skip_right'));
      await user.click(screen.getByText('일간'));
      await user.click(screen.getByTestId('list_skip_right'));
      await user.click(screen.getByTestId('list_skip_right'));
      await user.click(screen.getByText('주간'));
      await user.click(screen.getByText('일간'));

      expect(screen.getByText('08월 01일')).toBeInTheDocument();
    });

    it('마지막 주차 날짜 선택 -> 주간 필터링 -> 일간 필터링으로 변경했을 때 해당 month의 1일이 선택되어야 한다', async () => {
      await user.click(screen.getByText('월간'));
      await user.click(screen.getByTestId('list_skip_right'));
      await user.click(screen.getByText('일간'));
      await user.click(screen.getByTestId('list_skip_left'));
      await user.click(screen.getByText('주간'));
      await user.click(screen.getByText('일간'));

      expect(screen.getByText('07월 30일')).toBeInTheDocument();
    });
  });

  //서버 코드 변경되면 적용 예정
  // describe('상세 내역 리스트 필터링 테스트', () => {
  //   const onChange = jest.fn();
  //   let user: any;

  //   beforeEach(() => {
  //     user = userEvent.setup();

  //     render(
  //       withRouter(
  //         <>
  //           <RecoilObserver node={dateState} initValue={initRecoilDateState} onChange={onChange} />
  //           <DetailFine />
  //         </>,
  //         '/group/17/book/detail?year=2023&month=7',
  //       ),
  //     );
  //   });

  //   it('', () => {
  //     // Arrange
  //     // Act
  //     // Assert
  //   });
  // });
});

describe('test', () => {
  it('ddf', async () => {
    // Arrange
    render(withRouter(<DetailFine />));

    await waitFor(() => screen.findByText('윤하나둘셋'));
    expect(screen.queryByText('윤하나둘셋')).toBeInTheDocument();
    // Act
    // Assert
  });
});
