import { LOGO } from '@/assets/icons/Logo';
import { SYSTEM } from '@/assets/icons/System';
import MobileLayout from '@/layouts/Mobile/MobileLayout';
import MobileHeader from '@/layouts/Mobile/components/MobileHeader';
import MobileSideBar from '@/layouts/Mobile/components/MobileSideBar';

import { useState } from 'react';
import styled from '@emotion/styled';

const MobilePreParing = () => {
  return (
    <MobileLayout location="GROUP">
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '120px', marginBottom: '24px' }}>{SYSTEM.MOBILEPREPARING}</div>
      <Title>서비스 준비 중인 페이지입니다!</Title>
    </MobileLayout>
  );
};

export default MobilePreParing;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  ${({ theme }) => theme.font.subhead_04};
  color: ${({ theme }) => theme.colors.secondary_900};
`;
