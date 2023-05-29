import { Button } from '@/components/@common';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Style from './styles';

export const NotFoundGroup = () => {
  const navigate = useNavigate();
  return (
    <Style.NotFoundGroupFrame>
      <div>모임을 찾을 수 없습니다.</div>
      <Button width="150px" height="42px" onClick={() => navigate('/')}>
        메인으로 이동하기
      </Button>
    </Style.NotFoundGroupFrame>
  );
};
