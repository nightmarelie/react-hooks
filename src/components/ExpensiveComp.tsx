import { memo, useMemo, useState } from 'react';
import { useWhyDidYouUpdate } from '../hooks';

type CountProps = {
  style: Record<string, string>;
  count: number;
};

const Counter = memo((props: CountProps) => {
  useWhyDidYouUpdate({ name: 'Counter', props });
  return <div style={props.style}>{props.count}</div>;
});

export const ExpensiveComp = () => {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(0);
  // Our console output tells use that the style prop for <Counter> ...
  // ... changes on every render, even when we only change userId state by ...
  // ... clicking the "switch user" button. Oh of course! That's because the
  // ... counterStyle object is being re-created on every render.
  // Thanks to our hook we figured this out and realized we should probably ...
  // ... move this object outside of the component body.
  const counterStyle = {
    fontSize: '3rem',
    color: 'red',
  };

  // const counterStyle = useMemo(
  //   () => ({
  //     fontSize: "3rem",
  //     color: "red",
  //   }),
  //   []
  // );
  return (
    <div>
      <div className="counter">
        <Counter count={count} style={counterStyle} />
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div className="user">
        <img src={`http://i.pravatar.cc/80?img=${userId}`} alt={String(userId)} />
        <button onClick={() => setUserId(userId + 1)}>Switch User</button>
      </div>
    </div>
  );
};
