import MobileLayout from '@/layouts/Mobile/MobileLayout';
import MobileGroupSection from '@/m-components/MobileHome/GroupSection';
import { useState } from 'react';

const MobileHome = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const sideBarHandler = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <>
      <MobileLayout location="HOME">
        <div style={{ height: '200px', width: '100%', backgroundColor: '#000000' }} />
        <MobileGroupSection />
      </MobileLayout>
    </>
  );
};

export default MobileHome;
