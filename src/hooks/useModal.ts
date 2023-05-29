import { useState } from 'react';

const useModal = (initialValue: boolean) => {
  const [show, setShow] = useState(initialValue);

  const open = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  const toggle = () => {
    setShow((prev) => !prev);
  };

  return { show, open, close, toggle };
};

export default useModal;
