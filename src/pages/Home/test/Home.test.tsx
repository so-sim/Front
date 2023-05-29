import { withRouter } from '@/tests/withRouter';
import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import Home from '..';

describe('Home Page', () => {
  it('Invitation에서 로그인 후 리다이렉트 되었을 때에 다시 해당 그룹의 초대장 페이지로 이동해야 한다.', () => {
    defineSessionStorage(1);

    render(
      withRouter(
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/invitation`} element={<p>1번 그룹의 페이지 입니다.</p>} />
        </Routes>,
        '/',
      ),
    );

    expect(screen.getByText('1번 그룹의 페이지 입니다.')).toBeInTheDocument();
  });

  it('세션 스토리지가 비어있다면 home에 머물러야 한다.', () => {
    defineSessionStorage(null);

    render(
      withRouter(
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/invitation`} element={<p>1번 그룹의 페이지 입니다.</p>} />
        </Routes>,
        '/',
      ),
    );

    expect(screen.getByText('모임 만들기')).toBeInTheDocument();
    expect(screen.getByText('서비스 소개')).toBeInTheDocument();
  });
});

const defineSessionStorage = (groupId: number | null) => {
  Object.defineProperty(window, 'sessionStorage', {
    value: {
      getItem: jest.fn(() => groupId),
    },
    writable: true,
  });
};
