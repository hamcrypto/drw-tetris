import "./App.css";
import GridDisplay from "./components/GridDisplay/GridDisplay";

function App() {
  return (
    <>
      <h1>React Tetris Engine</h1>
      <GridDisplay columnCount={10} rowCount={20} />
    </>
  );
}

export default App;
