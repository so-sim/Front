import React from 'react';
import * as Style from './styles';

const StartDate = () => {
  return <Style.Body>반복 시작일은 반복 주기의 시작 기준이 되는 날짜입니다. 시작일을 포함한 그 뒤의 날짜 중, 알림 설정 조건에 해당되는 날짜부터 주기가 반복됩니다.</Style.Body>;
};

export default [<StartDate />];
