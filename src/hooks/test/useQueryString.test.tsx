import { withRouter } from '@/tests/withRouter';
import { render } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { QueryString, useQueryString } from '../useQueryString';

describe('useQueryString', () => {
  it('query를 객체 형식으로 반환하며, 타입은 string이다.', () => {
    let result: Partial<QueryString> = {};

    const Wrapper = () => {
      result = useQueryString();
      return <div />;
    };

    render(
      withRouter(
        <Routes>
          <Route path="/test" element={<Wrapper />} />
        </Routes>,
        '/test?groupId=1&year=2023&month=3',
      ),
    );

    expect(result.groupId).toBe('1');
    expect(result.year).toBe('2023');
    expect(result.month).toBe('3');
  });
});
