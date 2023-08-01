import { useEffect } from 'react';

const useOutsideClick = <T extends HTMLElement>(ref: React.RefObject<T>, callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
// 이 방식대로 진행하고 상위에서 useRef를 생성해서 props를 넘겨주려했지만 forwardRef가 거슬렸음..
