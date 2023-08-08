import { LOGO } from '@/assets/icons/Logo';
import { SYSTEM } from '@/assets/icons/System';
import MobileLayout from '@/layouts/Mobile/MobileLayout';
import MobileHeader from '@/layouts/Mobile/components/MobileHeader';
import MobileSideBar from '@/layouts/Mobile/components/MobileSideBar';

import { useState } from 'react';

const MobilePreParing = () => {
  return (
    <MobileLayout location="GROUP">
      <div style={{ display: 'flex', justifyContent: 'center' }}>{SYSTEM.PREPARING}</div>
    </MobileLayout>
  );
};

export default MobilePreParing;
