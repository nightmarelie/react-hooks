import { useEffect, useRef } from 'react';

type MemoCompareProps<T> = {
  next: T;
  compare: (prev: T, next: T) => boolean;
};

export const useMemoCompare = <T>({ next, compare }: MemoCompareProps<T>) => {
  // Ref for storing previous value
  const previousRef = useRef<T>();
  const previous = previousRef.current as T;
  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = compare(previous, next);
  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });
  // Finally, if equal then return the previous value
  return isEqual ? previous : next;
};
