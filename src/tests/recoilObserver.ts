import { useEffect } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

/**
 * node : recoil state 값
 * onChange : 몇번 함수가 불렸는지 count할 수 있음
 * initValue : 만약 초기 값을 변경하고싶다면 여기에 데이터 넘겨주면 됨
 */
type RecoilObserverProp<T> = {
  node: RecoilState<T>;
  onChange?: (node: T) => void;
  initValue?: T;
};

export const RecoilObserver = <T>({ node, onChange, initValue }: RecoilObserverProp<T>) => {
  const [value, setValue] = useRecoilState(node);

  useEffect(() => {
    if (onChange) onChange(value);
  }, [onChange, value]);

  useEffect(() => {
    if (initValue) setValue(initValue);
  }, []);

  return null;
};
