import { useState } from 'react';

export const useBoolean = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  return [value, setValue];
};
