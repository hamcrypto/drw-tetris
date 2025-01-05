import "./App.css";
import GridDisplay from "./components/GridDisplay/GridDisplay";
import TurnBuilder from "./components/TurnBuilder/TurnBuilder";
import { gridBuilder } from "./utils";

function App() {
  const initialArray = gridBuilder(10, 20);
  return (
    <>
      <h1>React Tetris Engine</h1>
      <div style={{ display: "flex", gap: "50px" }}>
        <TurnBuilder />
        <div>
          <h3>Turn Player</h3>
          <GridDisplay gridState={initialArray} />
        </div>
      </div>
    </>
  );
}

export default App;
