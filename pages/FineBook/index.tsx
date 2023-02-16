import React from 'react';
import MiniCalendar from './components/Calendar';
import DetailFine from './components/DetailFine';
import * as Style from './styles';

const FineBook = () => {
  return (
    <Style.Layout>
      <MiniCalendar />
      <DetailFine />
    </Style.Layout>
  );
};

export default FineBook;
