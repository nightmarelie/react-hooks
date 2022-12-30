import React from "react";

import { useKeyPress } from "../hooks";

export const KeyPress = () => {
  // Call our hook for each key that we'd like to monitor
  const happyPress: boolean = useKeyPress({ targetKey: "h" });
  const sadPress: boolean = useKeyPress({ targetKey: "s" });
  const robotPress: boolean = useKeyPress({ targetKey: "r" });
  const foxPress: boolean = useKeyPress({ targetKey: "f" });

  return (
    <div>
      <div>h, s, r, f</div>
      <div>
        {happyPress && "😊"}
        {sadPress && "😢"}
        {robotPress && "🤖"}
        {foxPress && "🦊"}
      </div>
    </div>
  );
};
