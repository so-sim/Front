/**
 * 입장하기를 눌렀을 때
 *
 * 1. 로그인이 되어있지 않으면 로그인 모달을 띄워줘야 한다
 *   1-1. 로그인을 한 후에 home으로 자동 리다이렉트 되는데
 *        home에 들어왔을 때 만약 sessionStorage에 아이디가 있을 경우 다시 초대장 페이지로 리다이렉트
 *
 * 2. 로그인이 되어 있을 경우
 *   2-1. 해당 그룹의 멤버일 경우 해당 그룹의 캘린더 페이지로 이동
 *   2-2. 해당 그룹의 멤버가 아닐 경우 해당 그룹의 이름과 닉네임 입력 모달이 떠야 함
 *
 */

import { BASE_URL } from '@/api';
import { server } from '@/mocks/server';
import { userState } from '@/store/userState';
import { RecoilObserver } from '@/tests/recoilObserver';
import { withRouter } from '@/tests/withRouter';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { Route, Routes } from 'react-router-dom';
import Invitation from '..';

describe('Invitaion Page 입장하기를 눌렀을 때', () => {
  let user: any;
  beforeEach(() => {
    user = userEvent.setup();
  });

  it('로그인이 되어 있지 않은 경우에는 로그인 모달을 띄워줘야 한다.', async () => {
    // Arrange
    render(
      withRouter(
        <>
          <RecoilObserver node={userState} initValue={{ userId: null, email: null }} />
          <Invitation />
        </>,
        '/invitation?groupId=1',
      ),
    );

    // Act
    await waitFor(() => screen.findByText('입장하기'));
    await user.click(screen.getByText('입장하기'));

    // Assert
    expect(screen.getByText('로그인')).toBeInTheDocument();
  });

  describe('로그인이 되어 있는 상태', () => {
    it('해당 그룹의 멤버가 아닐 경우 ', async () => {
      // Arrange
      // server.use(
      //   rest.get(BASE_URL + '/api/group/:groupId', (req, res, ctx) => {
      //     const groupId = req.url.searchParams.get('groupId');
      //     return res(
      //       ctx.status(200),
      //       ctx.json({
      //         status: {
      //           code: 200,
      //           message: '모임이 성공적으로 조회되었습니다.',
      //         },
      //         content: {
      //           title: '전국 노래 자랑',
      //           adminNickname: '윤하나둘셋넷',
      //           coverColor: '#f86565',
      //           type: '학교, 교내/외 모임',
      //           isAdmin: false,
      //           isInto: true,
      //           groupId,
      //           size: 2,
      //         },
      //       }),
      //     );
      //   }),
      // );
      render(
        withRouter(
          <>
            <RecoilObserver node={userState} initValue={{ userId: 1, email: 'antoni@nana.com' }} />
            <Invitation />
          </>,
          '/invitation?groupId=1',
        ),
      );

      // Act
      await waitFor(() => screen.findByText('전국 노래 자랑'));
      await user.click(screen.getByText('입장하기'));
      // Assert

      expect(screen.getAllByText('전국 노래 자랑')).toHaveLength(2);
      expect(screen.getByText('내 이름')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('모임에서 사용할 이름을 입력해 주세요.')).toBeInTheDocument();
    });

    it('해당 그룹의 멤버일 경우 ', async () => {
      // Arrange
      server.use(
        rest.get(BASE_URL + '/api/group/:groupId', (req, res, ctx) => {
          const groupId = req.url.searchParams.get('groupId');
          return res(
            ctx.status(200),
            ctx.json({
              status: {
                code: 200,
                message: '모임이 성공적으로 조회되었습니다.',
              },
              content: {
                title: '전국 노래 자랑',
                adminNickname: '윤하나둘셋넷',
                coverColor: '#f86565',
                type: '학교, 교내/외 모임',
                isAdmin: false,
                isInto: true,
                groupId,
                size: 2,
              },
            }),
          );
        }),
      );
      const groupId = 1;
      render(
        withRouter(
          <>
            <RecoilObserver node={userState} initValue={{ userId: 1, email: 'antoni@nana.com' }} />
            <Routes>
              <Route path={`/group/${groupId}/book`} element={<p>{groupId}번 그룹 페이지입니다.</p>} />
              <Route path={`/invitation`} element={<Invitation />} />
            </Routes>
          </>,
          `/invitation?groupId=${groupId}`,
        ),
      );

      // Act
      await waitFor(() => screen.findByText('전국 노래 자랑'));
      await user.click(screen.getByText('입장하기'));
      // Assert

      expect(screen.getByText(`${groupId}번 그룹 페이지입니다.`)).toBeInTheDocument();
    });
  });
});
