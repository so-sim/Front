import { withRouter } from '@/tests/withRouter';
import { render, screen } from '@testing-library/react';
import { STATUS_LIST } from '@/constants/Detail';
import CircleButtonList from '..';

describe('CircleButtonList', () => {
  describe('관리자일 경우', () => {
    const isAdmin = true;

    it('자신의 상세 내역이 아니고, 상태가 "con"일 경우 "확인필요", "미납", "완납" 버튼이 존재해야 함', () => {
      const buttonList = ['확인필요', '미납', '완납'];
      render(
        withRouter(
          <CircleButtonList
            setOpenButtonListId={() => {}} //
            status="con"
            isOwn={false}
            eventId={1}
            isAdmin={isAdmin}
            statusList={STATUS_LIST}
          />,
        ),
      );

      buttonList.forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
      expect(screen.getAllByRole('button').length).toBe(3);
    });

    it('자신의 상세 내역일 경우 "미납", "완납" 버튼만 존재해야 함', () => {
      const buttonList = ['미납', '완납'];
      render(
        withRouter(
          <CircleButtonList
            setOpenButtonListId={() => {}} //
            status="non"
            isOwn={true}
            eventId={1}
            isAdmin={isAdmin}
            statusList={STATUS_LIST}
          />,
        ),
      );

      buttonList.forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
      expect(screen.queryByText('확인필요')).toBeNull();
      // queryBy는 해당 element가 없을 때 null을 반환하고, getByText는 error반환
      // expect(screen.getByText('확인필요')).toThrow();
      expect(screen.getAllByRole('button').length).toBe(2);
    });
  });

  describe('유저일 경우', () => {
    const isAdmin = false;

    it('상태가 "non"이고, 자신의 상세 내역일 경우 확인요청 버튼이 존재해야 함', () => {
      render(
        withRouter(
          <CircleButtonList
            setOpenButtonListId={() => {}} //
            status="non"
            isOwn={true}
            eventId={1}
            isAdmin={isAdmin}
            statusList={STATUS_LIST}
          />,
        ),
      );

      expect(screen.getByText('확인요청')).toBeInTheDocument();
      expect(screen.getAllByRole('button').length).toBe(2);
    });
  });
});
