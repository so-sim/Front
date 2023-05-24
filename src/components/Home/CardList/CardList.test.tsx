import { server } from '@/mocks/server';
import { withRouter } from '@/tests/withRouter';
import { render, screen, waitFor } from '@testing-library/react';
import { CardList } from './index';
import { getGroupList } from '@/mocks/api/groupHandler';
import 'intersection-observer';
import { rest } from 'msw';

describe('테스트', () => {
  beforeEach(() => {
    render(withRouter(<CardList />));
  });

  it('cardlist mock data test', async () => {
    // Arrange
    // server.use(rest.get('https://back.sosim-manager.com/api/groups?index=0', getGroupList));
    // waitFor(() => screen.getByAltText('전국 노래 자랑'));
    await waitFor(() => screen.findByText('전국 노래 자랑'));

    // Act
    // Assert
    expect(screen.getByText('전국 노래 자랑')).toBeInTheDocument();
  });
});
