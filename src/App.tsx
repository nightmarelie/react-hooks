import React, { useEffect, useState } from "react";

import { Toggler, ShowCase, ObjectCompare, Obj, buildObj } from "./components";

function App() {
  const [obj, setObj] = useState<Obj>(buildObj());

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("changed");
      setObj(buildObj({ id: "test-2", value: "changed" }));
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>React hook</p>
      </header>
      <ShowCase title="useToggle. Toggle hook in the action">
        <Toggler />
      </ShowCase>
      <ShowCase title="useMemoCompare. Memo compare in the action">
        <ObjectCompare obj={obj} />
      </ShowCase>
    </div>
  );
}

export default App;
