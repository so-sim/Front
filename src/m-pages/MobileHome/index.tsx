import MobileLayout from '@/layouts/Mobile';
import MobileGroupSection from '@/m-components/MobileHome/GroupSection';

const MobileHome = () => {
  return (
    <MobileLayout>
      <div style={{ height: '200px', width: '100%', backgroundColor: '#000000' }} />
      <MobileGroupSection />
    </MobileLayout>
  );
};

export default MobileHome;
