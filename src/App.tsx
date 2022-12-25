import {
  Toggler,
  ShowCase,
  ObjectCompare,
  useObjectCompareCase,
  AsyncCall,
  MouseListener,
  ExpensiveComp,
  NameSaver,
  Columns,
  ToggleMode,
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
      <ShowCase title="useAsync">
        <AsyncCall />
      </ShowCase>
      <ShowCase title="useEventListener. Mouse Listener">
        <MouseListener />
      </ShowCase>
      <ShowCase title="useWhyDidYouUpdate">
        <ExpensiveComp />
      </ShowCase>
      <ShowCase title="useLocalStorage">
        <NameSaver />
      </ShowCase>
      <ShowCase title="useMedia">
        <Columns />
      </ShowCase>
      <ShowCase title="useDarkMode">
        <ToggleMode />
      </ShowCase>
    </div>
  );
}

export default App;
