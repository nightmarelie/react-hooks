import React from "react";
import { useAsync, Status } from "../hooks";

const myFunction = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd = Math.random() * 10;
      rnd <= 5
        ? resolve("Submitted successfully 🙌")
        : reject("Oh no there was an error 😞");
    }, 2000);
  });
};

export const AsyncCall = () => {
  const { execute, status, value, error } = useAsync({
    asyncFunction: myFunction,
    immediate: false,
  });
  return (
    <div>
      {status === Status.IDLE && (
        <div>Start your journey by clicking a button</div>
      )}
      {status === Status.SUCCESS && <div>{value}</div>}
      {status === Status.ERROR && <div>{error}</div>}
      <button onClick={execute} disabled={status === Status.PENDING}>
        {status !== Status.PENDING ? "Click me" : "Loading..."}
      </button>
    </div>
  );
};
