import { useEffect } from 'react';
import { Header, Banner, GroupSection, Footer } from '@/components/Home';
import * as Style from './styles';
import useRecentlyVisitedGroup from '@/hooks/useRecentlyVisitedGroup';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { getAccessToken } from '@/utils/acceessToken';
import { useQueryClient } from '@tanstack/react-query';

const Home = () => {
  const { isExist, navigateToSavedGroup } = useRecentlyVisitedGroup();

  const queryClient = useQueryClient();
  // useEffect(() => {
  //   const EventSource = EventSourcePolyfill || NativeEventSource;
  //   const SSE = new EventSource(`${process.env.REACT_APP_SERVER_URL}/api/subscribe`, {
  //     headers: {
  //       Authorization: `Bearer ${getAccessToken()}`,
  //     },
  //     withCredentials: true,
  //     heartbeatTimeout: 30 * 60 * 1000,
  //   });

  //   SSE.addEventListener('subscribe', (e) => {
  //     console.log('subscribe: ', e);
  //   });

  //   SSE.addEventListener('notification', (e) => {
  //     console.log('notification: ', e);
  //     queryClient.invalidateQueries(['notificationCount']);
  //   });
  // }, []);

  useEffect(() => {
    if (isExist) navigateToSavedGroup();
  }, []);

  return (
    <Style.Main>
      <div>
        <Header />
        <Banner />
        <GroupSection />
      </div>
      <div>
        <Footer />
      </div>
    </Style.Main>
  );
};

export default Home;
