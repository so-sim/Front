import React, { useEffect, useState } from 'react';

/**
 *
 * @param initialValue 초기값
 * @param validateFunction 유효성 검사 함수
 * @returns
 */
const useFormState = <T extends object>(initialValue: T, validateFunction: (form: T) => boolean) => {
  const [formState, setFormState] = useState<T>(initialValue);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validateFunction(formState));
  }, [formState]);

  return { formState, setFormState, isValid };
};

export default useFormState;
