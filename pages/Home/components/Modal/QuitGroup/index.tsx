import React from 'react';
import * as Style from './styles';

export const QuitGroup = () => {
  return (
    <Style.Frame>
      <Style.GroupName>
        <Style.GroupColor />
        <div>가나다라마바사아자차</div>
      </Style.GroupName>
      <Style.QuitButton>모임 탈퇴</Style.QuitButton>
    </Style.Frame>
  );
};
