import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation } from 'react-router-dom';

type Device = 'mobile' | 'desktop';

const useRedirectURL = () => {
  const location = useLocation();

  useEffect(() => {
    const splitedPathname = location.pathname.split('/');
    const equalPathBundle = findEqualPathBundle(splitedPathname);

    const { bundle, comparedDevice } = equalPathBundle;

    // 같은 디바이스일 경우 리다이렉트가 필요 없음 (모바일인 경우 경로가 "/m-home" 이라면 리다이렉트 필요 x)
    if (isSameDevice(comparedDevice)) return;

    const [desktop, mobile] = bundle;

    // 디바이스가 모바일인 경우, 모바일 경로로 리다이렉트
    if (isMobile) {
      redirectToCorrectUrl(mobile);
    } else {
      redirectToCorrectUrl(desktop);
    }
  }, [location.pathname]);
};

export default useRedirectURL;

const redirectToCorrectUrl = (url: string) => {
  window.location.href = process.env.REACT_APP_SERVICE_URL + url;
};

const isSameDevice = (comparedDevice: Device) => {
  const device: Device = isMobile ? 'mobile' : 'desktop';
  return device === comparedDevice;
};

// 현재 URL과 같은 경로를 가진 URL bundle을 찾는 함수
const findEqualPathBundle = (splitedPathname: string[]) => {
  const splitedUrlList = urlList.flat().map((url) => url.split('/'));
  let index = -1;

  for (const splitedUrl of splitedUrlList) {
    index++;
    if (splitedUrl.length !== splitedPathname.length) continue;

    if (isEqual(splitedUrl, splitedPathname)) {
      const targetIndex = Math.floor(index / 2);
      const comparedDevice: Device = index % 2 === 1 ? 'mobile' : 'desktop';

      return { bundle: urlList[targetIndex], comparedDevice };
    }
  }

  throw new Error('404 Page Not Found: 존재하지 않는 URL입니다. useRedirectURL을 확인해주세요');
};

/**
 * 두 개의 배열이 같은지 확인하는 함수 (와일드카드일 경우 분기 처리)
 */
const isEqual = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (!(arr1[i] === arr2[i] || arr1[i] === '*')) return false;
  }

  return true;
};

const urlList: [home: string, mobile: string][] = [
  ['/', '/m-home'],
  ['/', '/m-setting'],
  ['/', '/m-home/create-group'],
  ['/withdrawal', '/m-withdrawal'],
  ['/tos', '/m-tos'],
  ['/group/*/home', '/m-group/*/home'],
  ['/group/*/notice', '/m-group/*/notice'],
  ['/group/*/member', '/m-group/*/member'],
  ['/group/*/book', '/m-group/*/book'],
  ['/group/*/book', '/m-group/*/book/member-search'],
  ['/group/*/book', '/m-group/*/group-setting'],
  ['/group/*/book', '/m-group/*/group-setting/group'],
  ['/group/*/book', '/m-group/*/group-setting/alarm'],
  ['/group/*/book/detail', '/m-group/*/group-setting/create-finebook'],
  ['/group/*/book/detail', '/m-group/*/group-setting/update-finebook'],
];
