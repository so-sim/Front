import { useEffect } from 'react';

// 아예 트리거를 하는 state 까지 가지고 return 해주면 좋을 것 같아 논의사항
const useLockScroll = (trigger: boolean) => {
  const blockScroll = () => {
    const html = document.documentElement;
    const { body } = document;

    if (!body || !body.style) return;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight = parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) || 0;

    html.style.position = 'relative';
    body.style.position = 'relative';
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
  };

  const allowScroll = () => {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;
    const { body } = document;

    if (!body || !body.style) return;

    html.style.position = '';
    html.style.overflow = '';
    body.style.position = '';
    body.style.overflow = '';
    body.style.paddingRight = '';
  };

  useEffect(() => {
    trigger ? blockScroll() : allowScroll();
  }, [trigger]);
};

export default useLockScroll;
