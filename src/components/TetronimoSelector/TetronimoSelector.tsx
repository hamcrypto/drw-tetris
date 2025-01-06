import { Dispatch, SetStateAction } from "react";
import {
  TETRONIMO_COL_COUNT,
  TETRONIMO_ROW_COUNT,
  TETRONIMOS,
} from "../../constants";
import { Tetromino } from "../../types";
import { createGrid } from "../../utils";
import GridDisplay from "../GridDisplay/GridDisplay";

interface TetronimoPieceHolderProps {
  tetronimo: Tetromino;
  setActiveTetronimo: Dispatch<SetStateAction<Tetromino | null>>;
  isSelected: boolean;
}

function TetronimoPieceHolder({
  tetronimo,
  setActiveTetronimo,
  isSelected,
}: TetronimoPieceHolderProps) {
  const gridState = createGrid(
    TETRONIMO_ROW_COUNT,
    TETRONIMO_COL_COUNT,
    tetronimo
  );

  return (
    <div
      style={{
        margin: "2px",
        cursor: "pointer",
        backgroundColor: isSelected ? "yellow" : undefined,
      }}
      onClick={() => setActiveTetronimo(isSelected ? null : tetronimo)}
    >
      <label>{tetronimo.name}</label>
      <GridDisplay gridState={gridState} />
    </div>
  );
}

interface TetronimoSelectorProps {
  activeTetronimo: Tetromino | null;
  setActiveTetronimo: Dispatch<SetStateAction<Tetromino | null>>;
}

function TetronimoSelector({
  activeTetronimo,
  setActiveTetronimo,
}: TetronimoSelectorProps) {
  return (
    <div
      style={{
        height: "600px",
        width: "358px",
        overflowY: "scroll",
        border: "1px solid black",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      {TETRONIMOS.map((currentTetronimo) => (
        <TetronimoPieceHolder
          tetronimo={currentTetronimo}
          key={currentTetronimo.name}
          isSelected={activeTetronimo?.name === currentTetronimo?.name}
          setActiveTetronimo={setActiveTetronimo}
        />
      ))}
    </div>
  );
}

export default TetronimoSelector;
