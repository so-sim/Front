import React, { useEffect, useRef } from 'react';

const useWindowHeight = () => {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    windowRef.current?.style.setProperty('height', `${window.innerHeight - 47}px`);
    // console.log(window.innerHeight);
    // const vh = window.innerHeight * 0.01;
    // document.documentElement.style.setProperty('--vh', `${vh}px`);
    // window.addEventListener('resize', () => {
    //   const setVh = () => {
    //     document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    //   };
    //   window.addEventListener('resize', setVh);
    //   setVh();
    //   // windowRef.current?.style.setProperty('height', `${px * 100}px`);
    // });
  }, []);

  return { windowRef };
};

export default useWindowHeight;
