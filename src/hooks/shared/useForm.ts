import React, { useEffect, useState } from 'react';

/**
 *
 * @param initialValue 초기값
 * @param validateFunction 유효성 검사 함수
 * @returns
 */
const useForm = <T extends object>(initialValue: T, validateFunction: (form: T) => boolean) => {
  const [form, setForm] = useState<T>(initialValue);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validateFunction(form));
  }, [form]);

  return { form, setForm, isValid };
};

export default useForm;
