import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const isExceptionPath = (path: string) => {
  const EXCEPTION_PATH = ['/m-home'];
  return EXCEPTION_PATH.includes(path);
};

const isOverHeight = () => {
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );

  return window.innerHeight < scrollHeight;
};

const useWindowHeight = () => {
  const windowRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    /**
     * home에서 예외처리가 없을 때, height가 innerHeight로 고정되는데,
     * 이 때문에 home에서 배경화면이 비어 있는 현상 발생
     * 이를 방지하기 위해 home에서는 height를 100%로 설정
     *
     * 추후 추가되는 페이지가 발생한다면, isExceptionPath에 경로 추가
     */
    if (isExceptionPath(location.pathname)) {
      windowRef.current?.style.setProperty('height', '100%');
      return;
    }

    windowRef.current?.style.setProperty('height', `${window.innerHeight - 47}px`);
  }, [location]);

  return { windowRef };
};

export default useWindowHeight;
