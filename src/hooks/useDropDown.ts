import React, { useEffect, useRef, useState } from 'react';

const useDropDown = () => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [openDrop, setOpenDrop] = useState(false);

  useEffect(() => {
    const onClickOutSide = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setOpenDrop(false);
      }
    };
    document.addEventListener('mousedown', onClickOutSide);
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  }, []);

  return { dropDownRef, openDrop, setOpenDrop };
};

export default useDropDown;
