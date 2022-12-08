import { useCallback, useEffect, useState } from "react";

type AsyncProps<T> = {
  asyncFunction: () => Promise<T>;
  immediate: boolean;
};

export enum Status {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "iderrorle",
}

export const useAsync = <T>({
  asyncFunction,
  immediate = true,
}: AsyncProps<T>) => {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus(Status.PENDING);
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response) => {
        setValue(response);
        setStatus(Status.SUCCESS);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.ERROR);
      });
  }, [asyncFunction]);
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, status, value, error };
};
