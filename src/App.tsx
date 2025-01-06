import { useState } from "react";
import "./App.css";
import GridDisplay from "./components/GridDisplay/GridDisplay";
import TurnBuilder from "./components/TurnBuilder/TurnBuilder";
import { dropTetromino, getFilledHeight, createGrid } from "./utils";
import { TETRIS_COL_COUNT, TETRIS_ROW_COUNT } from "./constants";
import TurnsListTable from "./components/TurnsListTable/TurnsListTable";
import { TurnsListItem, TurnResult, TurnsList } from "./types";
/*

  - Remaining fixes: 
    - Get the text input to work manually
      - Do as a radio button initially
    - Hook up the turns: 
      - Get the turns to actually populate the results grid (Should give the height as well as the grid itself saved)
      - Add state so that when the results grid is clicked it updates the visualizer
      - Change visualizer to be hidden until shown
      - Write some unit tests
    - Write the Readme
    - Tidy up code
    - UX improvements
  
  - Improvements:
    - Not responsive 
    - Performance


  */
function App() {
  const [previewGrid, setPreviewGrid] = useState(
    createGrid(TETRIS_COL_COUNT, TETRIS_ROW_COUNT)
  );
  const [showPreviewGrid, setShowPreviewGrid] = useState(false);
  const [turnsList, setTurnsList] = useState<TurnsList>([]);

  const playTurn = (turnToPlay: TurnsListItem): TurnResult => {
    let outputGrid = createGrid(TETRIS_COL_COUNT, TETRIS_ROW_COUNT);
    turnToPlay.turns.forEach(({ tetronimo, colOffset }) => {
      outputGrid = dropTetromino(outputGrid, tetronimo, colOffset);
    });
    const blockHeight = getFilledHeight(outputGrid);
    return { outputGrid, blockHeight };
  };

  const playAllUnplayedTurns = () => {
    setTurnsList((prevTurnsList) => {
      const processedTurnsList = prevTurnsList.map((currentTurn) => {
        if (currentTurn.result) return currentTurn;
        const result = playTurn(currentTurn);
        return { ...currentTurn, result };
      });

      return processedTurnsList;
    });
  };
  function resetTurnsList() {
    setTurnsList([]);
    setShowPreviewGrid(false);
  }
  return (
    <>
      <h1>React Tetris Engine</h1>
      <div style={{ display: "flex", gap: "50px" }}>
        <TurnBuilder setTurnsList={setTurnsList} />
        <div style={{ width: "100%" }}>
          <h3>Turns list</h3>
          <TurnsListTable
            turnsList={turnsList}
            setPreviewGrid={setPreviewGrid}
            setShowPreviewGrid={setShowPreviewGrid}
          />
          <div>
            <button onClick={resetTurnsList} disabled={!turnsList.length}>
              Reset turns list
            </button>
            <button onClick={playAllUnplayedTurns}>Play unplayed turns</button>
          </div>
        </div>
        {showPreviewGrid && (
          <div style={{ width: "100%" }}>
            <h3>Result Visualizer</h3>
            <GridDisplay gridState={previewGrid} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
