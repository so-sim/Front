import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation } from 'react-router-dom';

type Device = 'mobile' | 'desktop' | 'common';

// isMobile은 크롬에서 모바일 -> 데스크탑으로 변경했을 때, 감지하지 못함
// 즉, 초기값을 계속 유지하는 거 같음 마치 localStorage처럼
const useRedirectURL = () => {
  const location = useLocation();

  useEffect(() => {
    const splitedPathname = location.pathname.split('/');
    const equalPathBundle = findEqualPathBundle(splitedPathname);

    const { bundle, comparedDevice, params } = equalPathBundle;

    // 같은 디바이스일 경우 리다이렉트가 필요 없음 (모바일인 경우 경로가 "/m-home" 이라면 리다이렉트 필요 x)
    if (isSameDevice(comparedDevice)) return;

    // 둘 다 공통으로 사용되는 auth와 같은 페이지
    if (comparedDevice === 'common') return;
    const [desktop, mobile] = bundle;

    // 디바이스가 모바일인 경우, 모바일 경로로 리다이렉트
    if (isMobile) {
      redirectToCorrectUrl(mapParams(mobile, params));
    } else {
      redirectToCorrectUrl(mapParams(desktop, params));
    }
  }, [location]);
};

export default useRedirectURL;

const mapParams = (url: string, params: string[]) => {
  let mappedUrl = url;
  for (let param of params) {
    mappedUrl = mappedUrl.replace('*', param);
  }

  return mappedUrl;
};

// 현재 URL과 같은 경로를 가진 URL bundle을 찾는 함수
const findEqualPathBundle = (splitedPathname: string[]) => {
  const splitedUrlList = urlList.flat().map((url) => url.split('/'));
  let index = -1;

  for (const splitedUrl of splitedUrlList) {
    index++;
    if (splitedUrl.length !== splitedPathname.length) continue;
    const params: string[] = [];

    if (isEqual(splitedUrl, splitedPathname, params)) {
      const targetIndex = Math.floor(index / 2);
      const comparedDevice: Device = index % 2 === 1 ? 'mobile' : 'desktop';

      return { bundle: urlList[targetIndex], comparedDevice, params };
    }
  }

  return { bundle: ['', ''], comparedDevice: 'common' as Device, params: [] };
  // throw new Error('404 Page Not Found: 존재하지 않는 URL입니다. useRedirectURL을 확인해주세요');
};

/**
 * 두 개의 배열이 같은지 확인하는 함수 (와일드카드일 경우 분기 처리)
 */
const isEqual = (arr1: string[], arr2: string[], params: string[]) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (!(arr1[i] === arr2[i] || arr1[i] === '*')) return false;
    if (arr1[i] === '*') params.push(arr2[i]);
  }

  return true;
};

/**
 * 좌측: 데스크탑 url
 * 우측: 모바일 url
 * 와일드카드는 *로 표시
 */
const urlList: [desktop: string, mobile: string][] = [
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

const redirectToCorrectUrl = (url: string) => {
  window.location.href = process.env.REACT_APP_SERVICE_URL + url;
};

const isSameDevice = (comparedDevice: Device) => {
  const device: Device = isMobile ? 'mobile' : 'desktop';
  return device === comparedDevice;
};
