import { useState } from "react";
import "./App.css";
import GridDisplay from "./components/GridDisplay/GridDisplay";
import TurnBuilder from "./components/TurnBuilder/TurnBuilder";
import { dropTetromino, getGridHeight, gridBuilder } from "./utils";
import { TETRIS_COL_COUNT, TETRIS_ROW_COUNT, TETRONIMO_J } from "./constants";
import TurnsListTable from "./components/TurnsListTable/TurnsListTable";
import { TurnsList } from "./types";
/*

TODONOW
TODONOW
TODONOW
TODONOW
TODONOW

  - Remaining fixes: 
    - (SHOULD BE DONE) Get it to add height when it is too big already (Should add 4 rows if height is in doubt)
    - Get the text input to work manually
    - Hook up the turns: 
      - Get the turns to actually populate the results grid (Should give the height as well as the grid itself saved)
      - Add state so that when the results grid is clicked it updates the visualizer
      - Change visualizer to be hidden until shown
      - Write some unit tests
    - Write the Readme
    - Tidy up code
  
  - Improvements:
    - Not responsive 
    - Performance

TODONOW
TODONOW
TODONOW
TODONOW
TODONOW
TODONOW
TODONOW
TODONOW



const playTurn = (turnToPlay: Turn[]) => {
    let adjustedGrid = [...displayArray];
    turnToPlay.forEach(({ tetronimo, colOffset }) => {
      adjustedGrid = dropTetromino(adjustedGrid, tetronimo, colOffset);
    });
    const height = getGridHeight(adjustedGrid);
    return { adjustedGrid, height };
  };

  const playAllUnplayedTurns = () => {
    turnsList.forEach((currentTurn, index ) => {
      const { adjustedGrid, height } = playTurn(currentTurn);
      setTurnsList(prevTurnsList => {
        return [...prevTurnsList, ]
      })
    });
  };


  */
function App() {
  const [displayArray, setDisplayArray] = useState(
    gridBuilder(TETRIS_COL_COUNT, TETRIS_ROW_COUNT)
  );
  const [turnsList, setTurnsList] = useState<TurnsList>([]);
  return (
    <>
      <h1>React Tetris Engine</h1>
      <div style={{ display: "flex", gap: "50px" }}>
        <TurnBuilder turnsList={turnsList} setTurnsList={setTurnsList} />
        <div style={{ width: "100%" }}>
          <h3>Turns list</h3>
          <TurnsListTable turnsList={turnsList} />
          <button onClick={() => console.log("log")}>Play all turns</button>
        </div>
        <div style={{ width: "100%" }}>
          <h3>Result Visualizer</h3>
          <button
            onClick={() => {
              const latestTurn = turnsList.length - 1;
              const lastTurns = turnsList[latestTurn];

              console.log({ latestTurn, lastTurns, turnsList });

              let adjustedGrid = [...displayArray];
              lastTurns.forEach(({ tetronimo, colOffset }) => {
                adjustedGrid = dropTetromino(
                  adjustedGrid,
                  tetronimo,
                  colOffset
                );
              });
              setDisplayArray(adjustedGrid);
            }}
          >
            Play latest turn
          </button>
          <button
            onClick={() => {
              console.log("THE GRID HEIGHT IS ", getGridHeight(displayArray));
            }}
          >
            Grid Height
          </button>
          <button
            onClick={() => {
              setDisplayArray((prev) => dropTetromino(prev, TETRONIMO_J, 0));
            }}
          >
            MASh
          </button>
          <GridDisplay gridState={displayArray} />
        </div>
      </div>
    </>
  );
}

export default App;
