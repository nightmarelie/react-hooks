import React from "react";

import { Toggler, ShowCase } from "./components";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>React hook</p>
      </header>
      <ShowCase title="useToggle. Toggle hook in the action">
        <Toggler />
      </ShowCase>
    </div>
  );
}

export default App;
