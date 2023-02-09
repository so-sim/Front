import React from 'react';
import { ARROW } from '../../assets/icons/Arrow';
import Button from '../../common/Button';
import * as Style from './styles';

const WEEKDATE = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WholeCalendar = () => {
  return (
    <>
      <Style.Layout>
        <span>벌금 장부</span>
        <Style.Header>
          <div>
            <Style.DateHeader>2023년 12월</Style.DateHeader>
            <div>
              <Style.ArrowWrapper>{ARROW.LEFT}</Style.ArrowWrapper>
              <Style.ArrowWrapper>{ARROW.RIGHT}</Style.ArrowWrapper>
            </div>
          </div>
          <Button width="124px" color="black">
            내역 추가하기
          </Button>
        </Style.Header>
        <Style.WeekDate>
          {WEEKDATE.map((date) => (
            <div key={date}>{date}</div>
          ))}
        </Style.WeekDate>
      </Style.Layout>
    </>
  );
};

export default WholeCalendar;
