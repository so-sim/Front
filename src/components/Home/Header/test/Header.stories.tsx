import { userState, UserState } from '@/store/userState';
import { RecoilObserver } from '@/tests/recoilObserver';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useEffect } from 'react';
import { Header } from '..';

export default {
  title: 'Component/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const LoggedOut = Template.bind({});

const Template2: ComponentStory<typeof Header> = () => {
  const loggedInUser: UserState = {
    email: 'antoni0922@naver.com',
    userId: 1,
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('recoil-persist');
    };
  }, []);

  return (
    <>
      <RecoilObserver onChange={() => {}} node={userState} initValue={loggedInUser} />
      <Header />
    </>
  );
};
export const LoggedIn = Template2.bind({});
