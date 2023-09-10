import Page404 from '@/components/error/404';
import MemberManagement from '@/pages/MemberManagement';
import PreParing from '@/pages/PreParing';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import FineBook from '../../pages/FineBook';
import Calendar from '../../pages/WholeCalendar';
import GroupList from './components/GroupList';
import GroupLayoutHeader from './components/Header';
import GroupSideBar from './components/SideBar';
import * as Style from './styles';

const GroupLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(window.innerWidth >= 1680);

  const handleSideBar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleSideBar = () => {
      if (window.innerWidth >= 1680) {
        setIsSideBarOpen(true);
      } else {
        setIsSideBarOpen(false);
      }
    };

    window.addEventListener('resize', handleSideBar);
    return () => {
      window.removeEventListener('resize', () => handleSideBar);
    };
  }, []);
  return (
    <>
      <GroupLayoutHeader handleSideBar={handleSideBar} />
      <Style.GridLayout isSideBarOpen={isSideBarOpen}>
        <Style.SideBar isSideBarOpen={isSideBarOpen}>
          <GroupList />
          <GroupSideBar />
        </Style.SideBar>
        <Routes>
          <Route path={'/home'} element={<PreParing />} />
          <Route path={'/notice'} element={<PreParing />} />
          <Route path={`/book`} element={<Calendar />} />
          <Route path={`/book/detail`} element={<FineBook />} />
          <Route path={'/member'} element={<MemberManagement />} />
          <Route path="/group/*" element={<Page404 />} />
        </Routes>
      </Style.GridLayout>
    </>
  );
};

export default GroupLayout;
