import React, { FC, useEffect, useState } from 'react';
import { useMemoCompare } from '../hooks';

export type Obj = {
  id: string;
  someMethod: () => Promise<string>;
};

type ObjectCompareProps = {
  obj: Obj;
};

export const ObjectCompare: FC<ObjectCompareProps> = ({ obj }) => {
  const [state, setState] = useState<String>();

  // Use the previous obj value if the "id" property hasn't changed
  const objFinal = useMemoCompare<Obj>({
    next: obj,
    compare: (prev: Obj, next: Obj) => {
      return prev && prev.id === next.id;
    },
  });
  // Here we want to fire off an effect if objFinal changes.
  // If we had used obj directly without the above hook and obj was technically a
  // new object on every render then the effect would fire on every render.
  // Worse yet, if our effect triggered a state change it could cause an endless loop
  // where effect runs -> state change causes rerender -> effect runs -> etc ...
  useEffect(() => {
    // Call a method on the object and set results to state
    objFinal.someMethod().then((value) => setState(value));
  }, [objFinal]);

  return <div>{state}</div>;
};

type BuildObj = {
  id: string;
  value: string;
};

export const buildObj = ({ id = 'test-1', value = 'lol' } = {} as BuildObj) => {
  return {
    id,
    someMethod: () => new Promise<string>((resolve) => setTimeout((text) => resolve(text), 1000, value)),
  };
};

export const useObjectCompareCase = () => {
  const [obj, setObj] = useState<Obj>(buildObj());

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('changed');
      setObj(buildObj({ id: 'test-2', value: 'changed' }));
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('lol');
      setObj(buildObj({ id: 'test-1', value: 'lol' }));
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  return [obj];
};
