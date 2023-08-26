import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

// 아예 트리거를 하는 state 까지 가지고 return 해주면 좋을 것 같아 논의사항
const useLockScroll = (trigger: boolean) => {
  const blockScroll = () => {
    const html = document.documentElement;
    const { body } = document;

    if (!body || !body.style) return;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight = parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) || 0;

    // html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
    // body.style.scrollbarGutter = 'stable';
  };

  const allowScroll = () => {
    const html = document.documentElement;
    const { body } = document;

    if (!body || !body.style) return;

    // html.style.overflow = '';

    body.style.overflow = '';
    body.style.paddingRight = '';
    // body.style.scrollbarGutter = '';
  };

  useEffect(() => {
    trigger ? blockScroll() : allowScroll();
  }, [trigger]);
};

export default useLockScroll;
