import React from "react";

import { useLocalStorage } from "../hooks";

export const NameSaver = () => {
  const [name, setName] = useLocalStorage({
    key: "name",
    initialValue: "Bob",
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};
