import MobileLayout from '@/layouts/Mobile/MobileLayout';
import MobileGroupSection from '@/m-components/MobileHome/GroupSection';
import { useEffect } from 'react';

// 이렇게 안 하니까 height가 이상하게 잡혀요 왜일까요...
const MobileHome = () => {
  return (
    <MobileLayout location="HOME">
      <MobileGroupSection />
    </MobileLayout>
  );
};

export default MobileHome;
