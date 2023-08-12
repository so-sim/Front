import MobileLayout from '@/layouts/Mobile/MobileLayout';
import FilterBottomSheet from '@/m-components/BottomSheet/FilterBottomSheet';
import MobileGroupSection from '@/m-components/MobileHome/GroupSection';
import { DetailFilter } from '@/store/detailFilter';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const MobileHome = () => {
  const { groupId } = useParams();
  const [detailFilter, setDetailFilter] = useState<DetailFilter>({ nickname: '', situation: '', page: 0, size: 16, groupId: Number(groupId) });

  return (
    <>
      <MobileLayout location="HOME">
        <div style={{ height: '200px', width: '100%', backgroundColor: '#000000' }} />
        <MobileGroupSection />
      </MobileLayout>
      <FilterBottomSheet detailFilter={detailFilter} setDetailFilter={setDetailFilter} />
    </>
  );
};

export default MobileHome;
