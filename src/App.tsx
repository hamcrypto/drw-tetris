import "./App.css";
import GridDisplay from "./components/GridDisplay/GridDisplay";

function App() {
  return (
    <>
      <h1>React Tetris Engine</h1>
      <GridDisplay width={10} height={10} />
    </>
  );
}

export default App;
