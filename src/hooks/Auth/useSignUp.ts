import { KAKAO_URL } from '@/constants/Auth';
import { TOS, TOSList } from '@/constants/ServiceLink';
import React, { useState } from 'react';

const useSignUp = () => {
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const requiredTos = TOSList.filter((list) => list.required).map((list) => list.id);

  const checkedItemHandler = (tos: TOS, isChecked: boolean) => {
    if (isChecked) {
      return setCheckedList((prev) => [...prev, tos.id]);
    }
    setCheckedList(checkedList.filter((checked) => checked !== tos.id));
  };

  const checkHandler = (tos: TOS, e: React.ChangeEvent<HTMLInputElement>) => {
    checkedItemHandler(tos, e.target.checked);
  };

  const allCheckHandler = () => {
    if (isAllChecked) {
      setCheckedList([]);
    } else {
      setCheckedList([...requiredTos]);
    }
  };

  const onSubmit = () => {
    window.location.href = KAKAO_URL.SIGNUP;
  };

  const isCheckedId = (id: number) => {
    return checkedList.includes(id);
  };

  const isAllChecked = checkedList.length === requiredTos.length;

  return {
    checkHandler,
    allCheckHandler,
    onSubmit,
    isCheckedId,
    isAllChecked,
  };
};

export default useSignUp;
