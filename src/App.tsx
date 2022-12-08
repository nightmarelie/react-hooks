import {
  Toggler,
  ShowCase,
  ObjectCompare,
  useObjectCompareCase,
  AsyncCall,
} from "./components";

function App() {
  const [obj] = useObjectCompareCase();

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
      <ShowCase title="useAsync.">
        <AsyncCall />
      </ShowCase>
    </div>
  );
}

export default App;
