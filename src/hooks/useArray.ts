import { useState } from 'react';

export const useArray = <T>(initialValue: T[] = []) => {
  const [value, setValue] = useState<T[]>(initialValue);

  const push = (element: T) => {
    setValue(oldValue => [...oldValue, element]);
  };

  const remove = (index: number) => {
    setValue(oldValue => oldValue.filter((_, i) => i !== index));
  };

  const isEmpty = () => value.length === 0;

  return { value, setValue, push, remove, isEmpty };
};
