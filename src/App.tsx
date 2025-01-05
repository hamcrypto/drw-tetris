import { useState } from "react";
import "./App.css";
import GridDisplay from "./components/GridDisplay/GridDisplay";
import TurnBuilder from "./components/TurnBuilder/TurnBuilder";
import { gridBuilder } from "./utils";
import { TETRIS_COL_COUNT, TETRIS_ROW_COUNT } from "./constants";

function App() {
  const initialArray = gridBuilder(TETRIS_COL_COUNT, TETRIS_ROW_COUNT);
  const [turnsList, setTurnsList] = useState<string[]>([]);
  return (
    <>
      <h1>React Tetris Engine</h1>
      <div style={{ display: "flex", gap: "50px" }}>
        <TurnBuilder turnsList={turnsList} setTurnsList={setTurnsList} />
        <div>
          <h3>Turn Player</h3>
          <GridDisplay gridState={initialArray} />
        </div>
      </div>
    </>
  );
}

export default App;
