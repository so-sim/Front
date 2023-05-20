import { withRouter } from '@/utils/withRouter';
import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import DetailsHeader from '..';
import userEvent from '@testing-library/user-event';

describe('DetailsHeader', () => {
  it('32번 그룹 상세 페이지에서 뒤로가기 아이콘을 클릭하면 캘린더 페이지가 나와야 한다', async () => {
    const groupId = 32;
    const user = userEvent.setup();

    render(
      withRouter(
        // Routes로 묶어줘야 함
        <Routes>
          <Route path={`/group/:groupId/book/detail`} element={<DetailsHeader />} />
          <Route path={`/group/:groupId/book`} element={<p>{groupId} 페이지 입니다</p>} />
        </Routes>,
        `/group/${groupId}/book/detail`,
      ),
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByText(`32 페이지 입니다`)).toBeInTheDocument();
  });
});
