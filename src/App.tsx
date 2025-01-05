import { useState } from "react";
import "./App.css";
import GridDisplay from "./components/GridDisplay/GridDisplay";
import TurnBuilder from "./components/TurnBuilder/TurnBuilder";
import { gridBuilder } from "./utils";
import { TETRIS_COL_COUNT, TETRIS_ROW_COUNT } from "./constants";
import TurnsListTable from "./components/TurnsListTable/TurnsListTable";
import { TurnsList } from "./types";

function App() {
  const initialArray = gridBuilder(TETRIS_COL_COUNT, TETRIS_ROW_COUNT);
  const [turnsList, setTurnsList] = useState<TurnsList>([]);
  return (
    <>
      <h1>React Tetris Engine</h1>
      <div style={{ display: "flex", gap: "50px" }}>
        <TurnBuilder turnsList={turnsList} setTurnsList={setTurnsList} />
        <div style={{ width: "100%" }}>
          <h3>Turns list</h3>
          <TurnsListTable turnsList={turnsList} />
        </div>
        <div style={{ width: "100%" }}>
          <h3>Turn Player</h3>
          <GridDisplay gridState={initialArray} />
        </div>
      </div>
    </>
  );
}

export default App;
