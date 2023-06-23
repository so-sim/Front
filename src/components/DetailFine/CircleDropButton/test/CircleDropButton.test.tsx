import { withRouter } from '@/tests/withRouter';
import { render, screen } from '@testing-library/react';
import CircleDropButton from '..';

/**
 * ## 시나리오
 *
 * 1. 관리자일 경우
 * - status가 "con"일 경우 text가 "확인필요"이어야 한다.
 * - status가 "non"일 경우 text가 "미납"이어야 한다.
 * - status가 "full"일 경우 text가 "완납"이어야 한다.
 * 2. 유저일 경우
 * - status가 "con"일 경우
 *    - "확인요청" : 자신의 상세 내역이고, 현재 status가 미납일 때
 *    - "확인중" : 위의 상황 제외하고 모든 곳에서
 * - status가 "non"일 경우 text가 "미납"이어야 한다.
 * - status가 "full"일 경우 text가 "완납"이어야 한다.
 */

describe('관리자일 경우', () => {
  const isAdmin = true;

  it('status가 "con"일 경우 text가 "확인요청"이어야 한다. ', () => {
    // Arrange
    const situation = '확인중';
    render(withRouter(<CircleDropButton situation={situation} isAdmin={isAdmin} />));
    // Assert
    expect(screen.getByText('확인필요')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveStyleRule('background-color', '#fff1d6');
  });
  it('status가 "non"일 경우 text가 "미납"이어야 한다. ', () => {
    // Arrange
    render(withRouter(<CircleDropButton situation="미납" isAdmin={isAdmin} />));
    // Assert
    expect(screen.getByText('미납')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveStyleRule('background-color', '#FFECE5');
  });
  it('status가 "full"일 경우 text가 "완납"이어야 한다. ', () => {
    // Arrange
    render(withRouter(<CircleDropButton situation="완납" isAdmin={isAdmin} />));
    // Assert
    expect(screen.getByText('완납')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveStyleRule('background-color', '#f0f6ff');
  });
});

describe('일반 사용자일 경우', () => {
  const isAdmin = false;

  describe('status가 "con"일 경우', () => {
    it('만약에 자신의 목록이고, 저장되어 있는 상태값이 "non"일 경우 "확인요청"이어야한다., ', () => {
      // Arrange
      render(withRouter(<CircleDropButton situation="확인중" isAdmin={isAdmin} isOwn={true} originStatus="미납" />));

      // Assert
      expect(screen.getByText('확인요청')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveStyleRule('background-color', '#fff1d6');
    });
    it('status가 "con"일 경우만약에 자신의 목록이고, 저장되어 있는 상태값이 "non"이 아닐 경우 "확인중"이어야한다., ', () => {
      // Arrange
      render(withRouter(<CircleDropButton situation="확인중" isAdmin={isAdmin} isOwn={true} />));

      // Assert
      expect(screen.getByText('확인중')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveStyleRule('background-color', '#fff1d6');
    });
  });

  it('status가 "non"일 경우 text가 "미납"이어야 한다. ', () => {
    // Arrange
    render(withRouter(<CircleDropButton situation="미납" isAdmin={isAdmin} />));
    // Assert
    expect(screen.getByText('미납')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveStyleRule('background-color', '#FFECE5');
  });
  it('status가 "full"일 경우 text가 "완납"이어야 한다. ', () => {
    // Arrange
    render(withRouter(<CircleDropButton situation="완납" isAdmin={isAdmin} />));
    // Assert
    expect(screen.getByText('완납')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveStyleRule('background-color', '#f0f6ff');
  });
});
