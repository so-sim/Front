import { useEffect } from 'react';

const useMultiRefs = (callback: () => void) => {
  let refs = new Set();

  const addRef = <T extends HTMLElement>(ref: T) => {
    if (ref !== null) {
      refs.add(ref);
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (refs.has(e.target)) {
      return;
    }
    callback();
  };

  useEffect(() => {
    if (refs.size !== 0) {
      document.addEventListener('click', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
  return { addRef, refs };
};

export default useMultiRefs;
